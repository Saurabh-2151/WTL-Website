import React from "react";
import Navbar2 from "@/components/Navbar2";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar2 />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}
