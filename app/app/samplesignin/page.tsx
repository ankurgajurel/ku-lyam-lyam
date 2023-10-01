"use client";

import { LogoEkOnly } from "@/components/assetComponents/Logos";
import Image from "next/image";

import DhirajAvatar from "@/public/avatar/dhiraj.jpeg";
import MerchantAvatar from "@/public/avatar/khalti.png";
import { useEffect, useState } from "react";
import { setUncaughtExceptionCaptureCallback } from "process";

export default function VerifyPassword() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setToken(token) : <></>;
  }, []);
  return (
    <section className="container mx-auto flex items-center justify-center py-20 px-10">
      <div className="card border-[1px] w-fit shadow-2xl shadow-[#BA4B32]/10 rounded-lg">
        <div className="verify-top flex items-center justify-center gap-2 border-b-[1px] px-10 py-4 mx-auto">
          <LogoEkOnly />
          <span className="text-lg">
            Verify to{"  "}
            <span className="text-[#BA4B32] font-extrabold">Khalti</span> with
            Ek Pahichan
          </span>
        </div>
        <div className="px-10 flex flex-col items-center py-5">
          <div className="pb-5">
            <span className="font-extrabold text-2xl">Authorize</span>
            <hr className="w-full mt-3" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="user-card bg-[#BA4B32]/[14%] py-3 px-5 rounded-[0.40rem] flex gap-5 items-center">
              <div className="avatar rounded-full">
                <Image
                  src={DhirajAvatar}
                  height={50}
                  width={50}
                  className="rounded-full"
                  alt=""
                />
              </div>
              <div className="info text-lg">
                <div className="name font-bold">Dhiraj Chapagain</div>
                <div className="phone">
                  <span className="number">9843953546</span> (
                  <span className="status">Primary Number</span>)
                </div>
              </div>
              <div className="tick">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4999 0.083313C4.74992 0.083313 0.083252 4.74998 0.083252 10.5C0.083252 16.25 4.74992 20.9166 10.4999 20.9166C16.2499 20.9166 20.9166 16.25 20.9166 10.5C20.9166 4.74998 16.2499 0.083313 10.4999 0.083313ZM8.41658 15.7083L3.20825 10.5L4.677 9.03123L8.41658 12.7604L16.3228 4.85415L17.7916 6.33331L8.41658 15.7083Z"
                    fill="#BA4B32"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center gap-1">
              <span>Not you? </span>
              <a href="/auth/">
                <span className="text-[#BA4B32]">change account</span>
              </a>
            </div>
            <input
              type="password"
              id="password"
              minLength={10}
              maxLength={15}
              name="password"
              className="py-3 mt-5 px-4 block w-full h-[55px] border-gray-200 border-[1px] rounded-[0.40rem] text-sm placeholder:text-base"
              required
              placeholder="Password"
              aria-describedby="password-error"
            />
          </div>
          <div className="buttons py-7">
            <a href={`/verify?token=${token}`}>
              <button className="px-5 py-3 text-base border-[1px] bg-[#BA4B32]/95 hover:bg-[#BA4B32] rounded-[0.40rem] text-white">
                Login Now
              </button>
            </a>
          </div>
          <div className="disclaimer max-w-md text-center">
            <span>
              Ek Pahichan{" "}
              <span className="text-[#BA4B32]">
                doesn&apos;t share your information{" "}
              </span>{" "}
              to Khalti to help authenticate you securely
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
