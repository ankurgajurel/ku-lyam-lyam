"use client";

import { useState } from "react";
import { LogoEkOnly } from "../assetComponents/Logos";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const signupData = {
      phoneNumber: phone,
      password: password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      if (response.ok) {
        console.log("Signup successful");
        const { user } = await response.json();
        console.log(response);
        localStorage.setItem("userId", user.id);
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="max-w-xl py-10 px-10 mx-auto container">
      <form
        onSubmit={handleSubmit}
        className="border-[1px] py-10 px-10 rounded-3xl"
      >
        <div className="flex gap-2 flex-col">
          <div className="flex text-base font-bold mx-auto gap-1">
            <span>Sign Up to </span> <LogoEkOnly /> Pahichan
          </div>
          <hr className="my-2" />
          <div className="">
            <label htmlFor="email" className="block text-sm mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-[0.40rem] text-sm"
                required
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-[0.40rem] text-sm"
                required
                aria-describedby="password-error"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex mt-5">
              <input
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                checked
              />
              <label className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                I agree to all of EkPahichan&apos;s Privacy Policies and Terms
                and Conditions.
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="py-3 mx-auto w-fit px-20 mt-5 inline-flex justify-center items-center gap-2 rounded-[0.40rem] border border-transparent font-semibold hover:bg-[#a64f3b] bg-[#BA4B32] text-white hover:bg-blue-600transition-all text-sm"
          >
            Sign Up
          </button>
        </div>
        <div className="pt-5 flex justify-center">
          <span className="text-base">
            Already have an account?{" "}
            <a href="/auth/login">
              <span className="font-extrabold">Log In here</span>
            </a>
          </span>
        </div>
      </form>
    </main>
  );
}
