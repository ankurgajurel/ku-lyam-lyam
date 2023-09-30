"use client";

import { useState } from "react";
import { LogoEkOnly } from "@/components/assetComponents/Logos";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const loginData = {
      phoneNumber: phone,
      password: password,
    };

    try {
      const response = await fetch("https://server-p7.samrid.me/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log("Login successful");
        const { token } = await response.json();
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="my-20 w-full max-w-lg mx-auto p-10 rounded-[0.40rem]">
      <div className="border border-gray-200 rounded-[0.40rem] bg-white shadow-sm">
        <div className="px-10 py-10">
          <div className="">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-[0.40rem] border font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm"
            >
              <LogoEkOnly />
              Login with Ek Pahichan
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6">
              Or
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
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
                      aria-describedby="email-error"
                    />
                  </div>
                </div>

                <div>
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

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-[0.40rem] border border-transparent font-semibold hover:bg-[#a64f3b] bg-[#BA4B32] text-white hover:bg-blue-600transition-all text-sm"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
