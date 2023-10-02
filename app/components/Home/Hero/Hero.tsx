"use client";
``;
import Typewriter from "typewriter-effect";

export default function HomeHero() {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300"
            href="#"
          >
            Export as Merchant
            <span className="flex items-center gap-x-1">
              <span className="border-l border-gray-200 text-[#BA4B32] pl-2">
                Merchant Portal
              </span>
              <svg
                className="w-2.5 h-2.5 text-[#BA4B32]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
            <>
              <Typewriter
                options={{
                  strings: [`Nepal's First Secure and Centralized KYC`],
                  autoStart: true,
                  loop: true,
                  cursor: " ",
                }}
              />
            </>
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-600">
            Unlocking Nepal&apos;s potential with a Unified KYC System |
            Seamlessly verify identities, empower growth.
          </p>
        </div>

        <div className="mt-8 w-full flex justify-center">
          <a
            className="inline-flex w-fit px-10 justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-[#504939] to-[#BA4B32] hover:from-[#BA4B32] hover:to-[#504939] transition duration-500 border border-transparent text-white text-sm font-medium rounded-full py-3"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
