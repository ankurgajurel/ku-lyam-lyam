"use client";

import { LogoEkOnly } from "../assetComponents/Logos";

export default function Merchant() {
  async function authorizeFlow({ claims, callbackUrl }: any) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const authorizeEndpoint = `${backendUrl}/flow/authorize`;

      const requestData = {
        claims,
        callbackUrl,
      };

      const response = await fetch(authorizeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "InternalKey@1234",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  function sendData() {
    const claims = ["cln5fmlsy0000tid08s26ga7z", "cln5fn7ob0001tid0mpnv0rkj"];
    const callbackUrl = "https://server-p7.samrid.me";

    authorizeFlow({ claims, callbackUrl })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  return (
    <div className="py-10 px-10 min-w-4xl flex items-center flex-col justify-center">
      <div className="w-full px-10 md:w-2/3 xl:w-1/3 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p- sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Sample Merchant Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="../examples/html/signin.html"
              >
                <br />
                Sample Merchant Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <a href="/auth/decrypter">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
              >
                <LogoEkOnly />
                Sign up with Ek Pahichan
              </button>
            </a>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">
              Or
            </div>

            <form onSubmit={() => {}}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm"
                      required
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
                      className="py-3 px-4 border-2 block w-full border-gray-200 rounded-md text-sm"
                      required
                      aria-describedby="password-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="remember-me" className="text-sm">
                      I accept the{" "}
                      <a
                        className="text-blue-600 decoration-2 hover:underline font-medium"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>sample merchant</div>
      <button onClick={() => sendData()}>Get Data</button>
    </div>
  );
}
