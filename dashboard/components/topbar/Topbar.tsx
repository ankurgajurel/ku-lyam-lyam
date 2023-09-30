"use client";

import React, { useState } from "react";

export default function Topbar() {
  const [openPopup, setOpenPopup] = useState(true);

  function togglePopup() {
    setOpenPopup(!openPopup);
  }

  return (
    <div className="pb-5 flex md:justify-between md:w-full flex-col lg:flex-row">
      <div className="greet flex flex-col gap-1">
        <div className="summary text-xl font-bold ">
          Ek Pahichan KYC Verification Dashboard
        </div>
        <div className="text hidden md:block">
          <span className="font-bold text-[#BA4B32]">Welcome Ankur</span>
          <span>, its great to see you again</span>
        </div>
      </div>
      <div className="cta flex gap-4 flex-col lg:flex-row">
        <div className="flex gap-5">
          <div></div>
          <div className="tasks">
            <a href="">
              <button className="border bg-[#BA4B32]/90 hover:bg-[#BA4B32] text-white px-5 py-2 rounded-lg">
                Pending Verifications
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
