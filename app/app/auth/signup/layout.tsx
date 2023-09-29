import Image from "next/image";
import BgImage from "../../../public/Logo/bg.png";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="">
        <Image
          src={BgImage}
          className="blur-[2px] opacity-70 bg-blend-multiply -z-10"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      {children}
    </section>
  );
}
