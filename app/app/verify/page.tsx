"use client";
import { LogoEkOnly } from "@/components/assetComponents/Logos";
import Image from "next/image";

import DhirajAvatar from "@/public/avatar/dhiraj.jpeg";
import MerchantAvatar from "@/public/avatar/khalti.png";

import { useSearchParams } from "next/navigation";

import jwt_decode from "jwt-decode";

export default function App() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  if (!token) {
    return <>Invalid shit smd</>;
  }
  var decoded = jwt_decode(token);
  console.log(decoded);

  function AgreeAndVerify() {
    const getDataURL =
      "https://server-p7.samrid.me/flow/data?dataToken=" + token;
    console.log(getDataURL);
  }

  const axios = require("axios");

  function fetchDataWithToken(apiUrl: string, bearerToken: string) {
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  const bearerToken = localStorage.getItem("token");
  const apiUrl =
    `https://server-p7.samrid.me/flow/data?dataToken=` + bearerToken;
  bearerToken
    ? fetchDataWithToken(apiUrl, bearerToken)
        .then((data: Object) => {
          console.log(data);
        })
        .catch((error: Error) => {
          console.error("data fetching error -- :", error);
        })
    : console.log("the token is buggy -- ");

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
          <div className="icons flex items-center gap-5">
            <div className="user-dp">
              <Image width={40} height={40} src={DhirajAvatar} alt="" />
            </div>
            <svg
              width="19"
              height="1"
              viewBox="0 0 19 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="4.37114e-08"
                y1="0.5"
                x2="19"
                y2="0.500002"
                stroke="#BA4B32"
                strokeOpacity="0.5"
                strokeDasharray="2 2"
              />
            </svg>
            <div className="merchant-dp">
              <Image width={40} height={40} src={MerchantAvatar} alt="" />
            </div>
          </div>
          <div className="merchant-name-verify flex flex-col py-7 items-center">
            <span className="font-extrabold text-2xl">
              Khalti Digital Wallet
            </span>
            <span>
              wants to{" "}
              <span className="text-[#BA4B32] font-extrabold">verify</span> your
            </span>
            <hr className="w-full mt-3" />
          </div>
          <div className="access-data flex flex-col text-base font-light">
            <span>Personal Details (Name, Email, Phone Number)</span>
            <span>Confidential Documents (Citizenship, License)</span>
          </div>
          <div className="buttons w-full flex gap-3 py-7">
            <button className="w-1/2 py-3 text-base border-[1px] border-[#BA4B32] hover:bg-[#BA4B32] hover:text-white transition-all duration-300 text-[#BA4B32] rounded-[0.40rem]">
              Cancel
            </button>
            <button
              onClick={() => {
                AgreeAndVerify();
              }}
              className="w-1/2 py-3 text-base border-[1px] bg-[#BA4B32]/95 hover:bg-[#BA4B32] rounded-[0.40rem] text-white"
            >
              Agree And Verify
            </button>
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