import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function Footer() {
  return (
    <div className="absolute bottom-3 flex items-center justify-center w-full z-50">
      <div className="flex items-center justify-center gap-4 text-xs text-fontlight font-normal bg-card/30 px-3 py-2 rounded-lg mx-auto">
        <button className="">Buy plan</button>
        <button className="">Advertise</button>
        <button className="">Resources</button>
        <button className="">About us</button>
        <button className="flex items-center gap-1">
          <span className="">English(UK)</span>
          <IoIosArrowDown className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Footer;
