import { LogoEkOnly, LogoSvg } from "../assetComponents/Logos";

export default function Login() {
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

            <form>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
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
