"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

declare global {
  interface Window {
    initGoogleAutocomplete?: () => void
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (
            inputField: HTMLInputElement,
            opts?: {
              componentRestrictions?: { country: string }
              types?: string[]
              fields?: string[]
            },
          ) => {
            addListener: (eventName: string, callback: () => void) => void
            getPlace: () => {
              formatted_address?: string
              name?: string
              address_components?: any[]
            }
          }
        }
        event?: {
          clearInstanceListeners?: (instance: any) => void
        }
      }
    }
  }
}

import './CabBookingForm.css';
export default function CabBookingForm() {
  // All useState declarations at the top!
  const pickupDateRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);
  const pickupTimeRef = useRef<HTMLInputElement>(null);
  // All useState declarations at the top!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // <-- single source of truth
  // Helper to check login state from localStorage only
const checkLoginState = () => {
  let loggedIn = false;
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      loggedIn = user.isLoggedIn === true;
    } catch {}
  }
  return loggedIn;
};

useEffect(() => {
  setLoading(true);
  // Wait 200ms to allow login to write to localStorage
  const timeout = setTimeout(() => {
    setIsLoggedIn(checkLoginState());
    setLoading(false);
  }, 200);
  return () => clearTimeout(timeout);
}, []);

// Listen for localStorage changes (login/logout in other tabs or after login)
useEffect(() => {
  const handleStorage = () => {
    setIsLoggedIn(checkLoginState());
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, []);

// If user logs in while popup is open, close the popup
useEffect(() => {
  if (isLoggedIn && showPopup) {
    setShowPopup(false);
  }
}, [isLoggedIn, showPopup]);

// Defensive: forcibly close popup if login state flips true
useEffect(() => {
  if (isLoggedIn && showPopup) {
    setShowPopup(false);
    console.log('[DEBUG] Forced popup close due to login state.');
  }
}, [isLoggedIn]);

  const router = useRouter()
  const [tripType, setTripType] = useState("oneWay")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [Returndate, setReturndate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [error, setError] = useState("")
  const [locationError, setLocationError] = useState("")
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [mapsError, setMapsError] = useState<string | null>(null)

  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)
  const[packageName, setPackageName]=useState("")

  
  const [userName, setUserName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const pickupRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLInputElement>(null)
  const pickupAutocompleteRef = useRef<any>(null)
  const dropAutocompleteRef = useRef<any>(null)
  const isInitializedRef = useRef(false)

  // Prefer env var, but also allow runtime overrides via localStorage for quick testing
  const runtimeKey = typeof window !== 'undefined' ? (localStorage.getItem('GMAPS_KEY') || "") : ""
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || runtimeKey || "AIzaSyDuZC6kFobB0pnp-k3VcxQIjvb0EhgfnVI"
  const today = new Date().toISOString().split("T")[0]

  // Reset form to initial state
  const resetForm = () => {
    setTripType("oneWay")
    setPickupLocation("")
    setDropLocation("")
    setPickupDate("")
    setReturndate("")
    setPickupTime("")
    setError("")
    setLocationError("")
    setCalculatedDistance(null)
    setUserName("")
    setMobileNumber("")
    setPackageName("")
    setShowPopup(false)

    // Clear input values directly
    if (pickupRef.current) {
      pickupRef.current.value = ""
    }
    if (dropRef.current) {
      dropRef.current.value = ""
    }

    // Re-initialize autocomplete after clearing
    setTimeout(() => {
      cleanupAutocomplete()
      initializeAutocomplete()
    }, 100)
  }

  // Check if place is in India
  const isPlaceInIndia = (place: any) => {
    if (!place.address_components) return false

    for (const component of place.address_components) {
      if (component.types.includes("country") && component.short_name === "IN") {
        return true
      }
    }
    return false
  }

  // Cleanup function for autocomplete instances
  const cleanupAutocomplete = () => {
    try {
      if (pickupAutocompleteRef.current) {
        // Try to clear listeners if the API is available
        if (window.google?.maps?.event?.clearInstanceListeners) {
          window.google.maps.event.clearInstanceListeners(pickupAutocompleteRef.current)
        }
        pickupAutocompleteRef.current = null
      }
      if (dropAutocompleteRef.current) {
        // Try to clear listeners if the API is available
        if (window.google?.maps?.event?.clearInstanceListeners) {
          window.google.maps.event.clearInstanceListeners(dropAutocompleteRef.current)
        }
        dropAutocompleteRef.current = null
      }
      isInitializedRef.current = false
    } catch (error) {
      console.warn("Error during autocomplete cleanup:", error)
      // Force reset refs even if cleanup fails
      pickupAutocompleteRef.current = null
      dropAutocompleteRef.current = null
      isInitializedRef.current = false
    }
  }

  // Initialize Google Autocomplete
  const initializeAutocomplete = () => {
    if (typeof window !== "undefined" && window.google && window.google.maps && window.google.maps.places) {
      // Prevent double initialization
      if (isInitializedRef.current) {
        return
      }

      // Clean up any existing instances first
      cleanupAutocomplete()

      if (pickupRef.current && !pickupAutocompleteRef.current) {
        try {
          pickupAutocompleteRef.current = new window.google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "in" },
            types: ["geocode", "establishment"],
            fields: ["formatted_address", "name", "address_components"],
          })
          pickupAutocompleteRef.current.addListener("place_changed", () => {
            const place = pickupAutocompleteRef.current?.getPlace()
            if (place && isPlaceInIndia(place)) {
              setPickupLocation(place?.formatted_address || place?.name || "")
              setLocationError("")
            } else {
              setPickupLocation("")
              setLocationError("We currently only provide services within India")
            }
          })
        } catch (error) {
          console.error("Error initializing pickup autocomplete:", error)
        }
      }

      if (dropRef.current && !dropAutocompleteRef.current) {
        try {
          dropAutocompleteRef.current = new window.google.maps.places.Autocomplete(dropRef.current, {
            componentRestrictions: { country: "in" },
            types: ["geocode", "establishment"],
            fields: ["formatted_address", "name", "address_components"],
          })
          dropAutocompleteRef.current.addListener("place_changed", () => {
            const place = dropAutocompleteRef.current?.getPlace()
            if (place && isPlaceInIndia(place)) {
              setDropLocation(place?.formatted_address || place?.name || "")
              setLocationError("")
            } else {
              setDropLocation("")
              setLocationError("We currently only provide services within India")
            }
          })
        } catch (error) {
          console.error("Error initializing drop autocomplete:", error)
        }
      }

      // Mark as initialized only if both autocomplete instances were created successfully
      if (pickupAutocompleteRef.current && dropAutocompleteRef.current) {
        isInitializedRef.current = true
      }
    }
  }

  // Set up global initialization function
  useEffect(() => {
    window.initGoogleAutocomplete = initializeAutocomplete
    return () => {
      // Clean up autocomplete instances when component unmounts
      cleanupAutocomplete()
      if (window.initGoogleAutocomplete) {
        window.initGoogleAutocomplete = undefined
      }
    }
  }, [])

  // Initialize when script loads or component mounts
  useEffect(() => {
    if (scriptLoaded) {
      // Add a small delay to ensure DOM elements are ready
      const timeoutId = setTimeout(() => {
        if (window.google?.maps?.places) {
          initializeAutocomplete()
        } else {
          setMapsError("Google Maps Places library not available after script load.")
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [scriptLoaded])

  // Warn if API key is missing
  useEffect(() => {
    if (!apiKey) {
      setMapsError((prev) => prev ?? "Google Maps API key is missing")
    } 
  }, [apiKey])

  // Re-initialize autocomplete when refs change (component re-mount)
  useEffect(() => {
    if (scriptLoaded && pickupRef.current && dropRef.current) {
      // Only re-initialize if we don't already have working autocomplete instances
      if (!pickupAutocompleteRef.current || !dropAutocompleteRef.current) {
        const timeoutId = setTimeout(() => {
          initializeAutocomplete()
        }, 100)

        return () => clearTimeout(timeoutId)
      }
    }
  }, [pickupRef.current, dropRef.current, scriptLoaded])

  // Handle page visibility changes and navigation back to form
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && scriptLoaded) {
        // Page became visible again, check if autocomplete needs re-initialization
        setTimeout(() => {
          if (pickupRef.current && dropRef.current) {
            // Check if autocomplete is still working by testing if the instances exist and are functional
            const needsReinit = !pickupAutocompleteRef.current || !dropAutocompleteRef.current
            if (needsReinit) {
              console.log("Re-initializing autocomplete after page visibility change")
              if (window.google?.maps?.places) {
                initializeAutocomplete()
              }
            }
          }
        }, 200)
      }
    }

    const handleFocus = () => {
      if (scriptLoaded) {
        // Window gained focus, ensure autocomplete is working
        setTimeout(() => {
          if (pickupRef.current && dropRef.current && (!pickupAutocompleteRef.current || !dropAutocompleteRef.current)) {
            console.log("Re-initializing autocomplete after window focus")
            initializeAutocomplete()
          }
        }, 200)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [scriptLoaded])

  // Handle component mount/remount - ensure autocomplete is initialized
  useEffect(() => {
    if (scriptLoaded) {
      // Check if we need to initialize autocomplete on mount
      const checkAndInitialize = () => {
        if (pickupRef.current && dropRef.current) {
          if (!pickupAutocompleteRef.current || !dropAutocompleteRef.current || !isInitializedRef.current) {
            console.log("Initializing autocomplete on component mount/remount")
            initializeAutocomplete()
          }
        }
      }

      // Use a longer delay to ensure DOM is fully ready
      const timeoutId = setTimeout(checkAndInitialize, 300)
      return () => clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array - only run on mount

  // Add custom styles for Google autocomplete dropdown
  useEffect(() => {
    const customStyles = document.createElement("style")
    customStyles.textContent = `
      .pac-container {
        border-radius: 8px;
        margin-top: 4px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        background-color: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 8px;
        z-index: 9995;
      }
      
      .pac-item {
        padding: 8px 10px;
        cursor: pointer;
        border-top: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        transition: all 0.2s ease;
      }
      
      .pac-item:hover {
        background-color: rgba(20, 184, 166, 0.6);
        color: white;
      }
      
      .pac-item-selected {
        background-color: rgba(20, 184, 166, 0.8);
        color: white;
      }
      
      .pac-item-query {
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        font-weight: 500;
        padding-right: 3px;
      }
      
      .pac-matched {
        color: #16a34a;
        font-weight: 600;
      }
      
      .pac-secondary-text {
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
      }
      
      .pac-logo:after {
        background-color: rgba(30, 41, 59, 0.95);
        padding: 4px 8px;
        height: 28px;
        opacity: 0.4;
        filter: grayscale(0.8);
        transition: opacity 0.3s ease;
      }
      
      .pac-container:not(:hover) .pac-logo:after {
        opacity: 0.2;
      }
      
      .pac-container:hover .pac-logo:after {
        opacity: 0.4;
      }
      
      .pac-icon {
        display: none;
      }
      
      .pac-item:before {
        content: "📍";
        margin-right: 10px;
      }
    `
    document.head.appendChild(customStyles)

    return () => {
      document.head.removeChild(customStyles)
    }
  }, [])

  const fetchTimeSlots = async (date: string) => {
    setIsLoadingTimeSlots(true)
    try {
      console.log("Fetching time slots for date:", date)
    } catch (error) {
      console.error("Error fetching time slots:", error)
    } finally {
      setIsLoadingTimeSlots(false)
    }
  }

  const handleDateSelection = (date: string, type: "pickup" | "return") => {
    if (type === "pickup") {
      setPickupDate(date)
      fetchTimeSlots(date)
    } else {
      setReturndate(date)
    }
  }

  const openDatePicker = (id: string) => {
    const dateInput = document.getElementById(id) as HTMLInputElement
    if (dateInput) {
      try {
        if (typeof dateInput.showPicker === "function") {
          dateInput.showPicker()
        }
      } catch (error) {
        console.log("Date picker not supported in this browser")
      }
    }
  }

  const openTimePicker = (id: string) => {
    const timeInput = document.getElementById(id) as HTMLInputElement
    if (timeInput) {
      try {
        if (typeof timeInput.showPicker === "function") {
          timeInput.showPicker()
        }
      } catch (error) {
        console.log("Time picker not supported in this browser")
      }
    }
  }

  const formatTime = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const calculateDistance = async (origin: string, destination: string) => {
    try {
      console.log("Calculating distance between:", origin, "and", destination)

      const response = await fetch("http://localhost:8085/api/cab1", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          tripType: tripType === "oneWay" ? "oneWay" : tripType === "roundTrip" ? "roundTrip" : "rentalTrip",
          pickupLocation: origin,
          dropLocation: destination,
          date: pickupDate || "",
          Returndate: Returndate || "",
          time: pickupTime || "",
          distance: "0",
        }),
      })

      const data = await response.json()
      console.log("Distance API response:", data)

      if (data && data.distance && data.distance > 0) {
        const distance = data.distance
        console.log("✅ Using API calculated distance:", distance)
        setCalculatedDistance(distance)
        return distance
      } else {
        console.warn(`Backend API failed to return valid distance. Using default value.`)
        const defaultDistance = 100
        setCalculatedDistance(defaultDistance)
        return defaultDistance
      }
    } catch (error) {
      console.error("Error calculating distance:", error)
      const defaultDistance = 100
      setCalculatedDistance(defaultDistance)
      return defaultDistance
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pickupLocation) {
      setError("Please enter pickup location");
      return;
    }
    if (!dropLocation) {
      setError("Please enter drop location");
      return;
    }
    if (!pickupDate) {
      setError("Please select pickup date");
      return;
    }
    if (tripType === "roundTrip" && !Returndate) {
      setError("Please select return date");
      return;
    }
    if (!pickupTime) {
      setError("Please select pickup time");
      return;
    }

    try {
      const distance = await calculateDistance(pickupLocation, dropLocation);
      if (isLoggedIn) {
        // Go directly to search results if logged in
        const searchParams = new URLSearchParams({
          pickup: pickupLocation,
          drop: dropLocation,
          date: pickupDate,
          time: pickupTime,
          tripType: tripType,
          Returndate: Returndate || "",
          distance: distance ? distance.toString() : "0",
        });
        router.push(`/search?${searchParams.toString()}`);
      } else {
        // Navigate directly to search page even if not logged in
        const searchParams = new URLSearchParams({
          pickup: pickupLocation,
          drop: dropLocation,
          date: pickupDate,
          time: pickupTime,
          tripType: tripType,
          Returndate: Returndate || "",
          distance: distance ? distance.toString() : "0",
        });
        router.push(`/search?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to submit booking. Please try again.");
    }
  }

  const handleFinalSubmit = () => {
    if (!userName.trim()) {
      setError("Please enter your name")
      return
    }

    if (!mobileNumber.trim()) {
      setError("Please enter your mobile number")
      return
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    const searchParams = new URLSearchParams({
      pickup: pickupLocation,
      drop: dropLocation,
      date: pickupDate,
      time: pickupTime,
      tripType: tripType,
      Returndate: Returndate || "",
      distance: calculatedDistance ? calculatedDistance.toString() : "0",
      name: userName,
      mobile: mobileNumber,
      packageName : packageName || ""
    })

    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <>
      {apiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
          onError={() => {
            console.error("Failed to load Google Maps script")
            setMapsError("Failed to load Google Maps script. Please try again later.")
          }}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl mx-auto mt-[-12px] sm:mt-[-20px] md:mt-[-40px] lg:mt-[-56px]
                   bg-white/30
                   rounded-[28px]
                   p-6 md:p-8
                   border border-white/40"
      >
        <div className="space-y-6">
          {/* Trip Type Selection as Segmented Control */}
          <div className="w-full max-w-md mx-auto">

            {/* Hidden input to keep tripType in form data */}
            <input type="hidden" name="tripType" value={tripType} />

            <div className="flex rounded-full bg-white/30 border border-white/40 p-1 gap-1">

              <button
                type="button"
                onClick={() => setTripType("oneWay")}
                className={`flex-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 ${
                  tripType === "oneWay"
                    ? "bg-emerald-500 text-white"
                    : "bg-transparent text-black hover:bg-white/30"
                }`}
              >
                One Way
              </button>

              <button
                type="button"
                onClick={() => setTripType("roundTrip")}
                className={`flex-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 ${
                  tripType === "roundTrip"
                    ? "bg-emerald-500 text-white"
                    : "bg-transparent text-black hover:bg-white/30"
                }`}
              >
                Round Trip
              </button>

              <button
                type="button"
                onClick={() => setTripType("rental")}
                className={`flex-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 ${
                  tripType === "rental"
                    ? "bg-emerald-500 text-white"
                    : "bg-transparent text-black hover:bg-white/30"
                }`}
              >
                Rental Trip
              </button>
            </div>
          </div>

          {/* Package Selection for Rental Trip */}
          {tripType === "rental" && (
            <div className="bg-white/30 rounded-2xl p-4 border border-white/40">

              <label className="block text-sm font-semibold text-black mb-3">
                Select Package
              </label>
              <div className="relative">
                <select
                  name="packageName"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full p-3.5 pr-10 border border-white/40 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 bg-white/40 text-black placeholder-gray-600 appearance-none cursor-pointer"

                  required
                >
                  <option value="" disabled className="bg-white text-gray-900">
                    Choose a package...
                  </option>
                  <option value="4hrs/40Km" className="bg-white text-gray-900">
                    4hrs/40Km - Perfect for city tours
                  </option>
                  <option value="8hrs/80Km" className="bg-white text-gray-900">
                    8hrs/80Km - Ideal for outstation trips
                  </option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-xs text-black/80">

                Choose your rental package based on duration and distance needs
              </div>
            </div>
          )}

          {/* Location and Time Selection - large horizontal tiles with Go on the right */}
          <div className="w-full">
            <div
              className={`grid grid-cols-1 gap-4 md:gap-5 items-stretch ${
                tripType === "roundTrip" ? "md:grid-cols-6" : "md:grid-cols-5"
              }`}
            >

              {/* From (Pickup) */}
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-black mb-2">From</div>
                <div className="relative h-full">
                  <input
                    ref={pickupRef}
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    onFocus={() => {
                      if (scriptLoaded && !pickupAutocompleteRef.current) {
                        console.log("Pickup input focused but no autocomplete - re-initializing")
                        setTimeout(() => initializeAutocomplete(), 100)
                      }
                    }}
                    className="w-full h-full pl-9 pr-4 py-4 rounded-2xl border border-white/60 bg-white text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* To (Drop) */}
              <div className="flex flex-col h-full">
                <div className="text-[13px] font-semibold text-black mb-2">
                  {tripType === "rental" ? "To (Optional)" : "To"}
                </div>
                <div className="relative h-full">
                  <input
                    ref={dropRef}
                    type="text"
                    placeholder={tripType === "rental" ? "Enter drop location (optional)" : "Enter drop location"}
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    onFocus={() => {
                      if (scriptLoaded && !dropAutocompleteRef.current) {
                        console.log("Drop input focused but no autocomplete - re-initializing")
                        setTimeout(() => initializeAutocomplete(), 100)
                      }
                    }}
                    className="w-full h-full pl-9 pr-4 py-4 rounded-2xl border border-white/60 bg-white text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    required={tripType !== "rental"}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                {tripType === "rental" && (
                  <div className="mt-1 text-[10px] text-black/70">
                    Drop location is optional for rental trips
                  </div>
                )}
              </div>

              {/* Date (Pickup Date) */}
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-black mb-2">Date</div>
                <div className="relative h-full">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => handleDateSelection(e.target.value, "pickup")}
                    min={today}
                    className="w-full h-full pl-9 pr-3 py-4 rounded-2xl border border-white/60 bg-white text-sm text-black hide-native-picker focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    required
                    ref={pickupDateRef}
                    onClick={() => {
                      if (pickupDateRef.current && typeof pickupDateRef.current.showPicker === 'function') {
                        pickupDateRef.current.showPicker();
                      }
                    }}
                  />
                </div>
              </div>

              {/* Return Date (only for round trip) */}
              {tripType === "roundTrip" && (
                <div className="flex flex-col">
                  <div className="text-[13px] font-semibold text-black mb-2">Return Date</div>
                  <div className="relative h-full">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      id="Returndate-top"
                      type="date"
                      value={Returndate}
                      onChange={(e) => handleDateSelection(e.target.value, "return")}
                      min={pickupDate || today}
                      className="w-full h-full pl-9 pr-3 py-4 rounded-2xl border border-white/60 bg-white text-sm text-black hide-native-picker focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      required
                      onClick={() => {
                        const el = document.getElementById('Returndate-top') as HTMLInputElement | null;
                        if (el && typeof el.showPicker === 'function') {
                          el.showPicker();
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Pickup Time */}
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold text-black mb-2">Pickup Time</div>
                <div className="relative h-full">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full h-full pl-9 pr-3 py-4 rounded-2xl border border-white/60 bg-white text-sm text-black hide-native-picker focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    ref={pickupTimeRef}
                    onClick={() => {
                      if (pickupTimeRef.current && typeof pickupTimeRef.current.showPicker === 'function') {
                        pickupTimeRef.current.showPicker();
                      }
                    }}
                  />
                  {isLoadingTimeSlots && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Go tile on the right */}
              <div className="flex items-stretch">
                <button
                  type="submit"
                  className="w-full h-full rounded-2xl bg-gray-300 text-white text-base font-semibold flex items-center justify-center hover:bg-gray-400 transition-colors"
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center mt-3">{error}</div>}
          {locationError && <div className="text-red-500 text-sm text-center mt-1">{locationError}</div>}

        </div>
      </form>

      {/* 
      {!loading && (showPopup && !isLoggedIn) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9996] p-2 sm:p-4">
          <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md mx-2 sm:mx-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Enter Your Details</h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="flex-1 bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      */}

    </>
  )
}