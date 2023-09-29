import { LogoEkOnly } from "@/components/assetComponents/Logos";
import Image from "next/image";

import DhirajAvatar from "@/public/avatar/dhiraj.png";
import MerchantAvatar from "@/public/avatar/khalti.png";

export default function App() {
  return (
    <section className="container mx-auto">
      <div className="card border-[1px] w-fit">
        <div className="verify-top flex items-center gap-2 border-b-[1px] px-10">
          <LogoEkOnly />
          <span className="text-lg">
            Verify to{" "}
            <span className="text-[#BA4B32] font-extrabold">Khalti</span> with
            Ek Pahichan
          </span>
        </div>
        <div className="px-10 flex flex-col items-center">
          <div className="icons flex">
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
                stroke-opacity="0.5"
                stroke-dasharray="2 2"
              />
            </svg>

            <div className="merchant-dp">
              <Image width={40} height={40} src={MerchantAvatar} alt="" />
            </div>
          </div>
          <div className="merchant-name-verify"></div>
          <div className="access-data"></div>
          <div className="buttons"></div>
          <div className="disclaimer"></div>
        </div>
      </div>
    </section>
  );
}
