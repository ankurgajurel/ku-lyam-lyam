"use client";

import { TableHero } from "@/components/hero/tables";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className="w-full mt-12 px-10 ml-[200px] md:ml-[350px]">
          <Topbar />
          <TableHero />
        </div>
      </div>
    </main>
  );
}
