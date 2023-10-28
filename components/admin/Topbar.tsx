"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import useAdminMenuStore from "@/hooks/useAdminMenuStore";
import Avatar from "../common/Avatar";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const menuStore = useAdminMenuStore();
  const path = usePathname();

  // const { data: session } = useSession();
  // console.log(session);
  return path.includes("login") ? (
    ""
  ) : (
    <div className="h-[4rem] bg-white p-4 border-b-2 flex justify-between items-center fixed w-full z-10  ">
      <div className="cursor-pointer flex items-center space-x-[5rem]">
        <Menu className="text-gray-600" onClick={menuStore.closeMenu} />
        <div className="lg:flex md:flex items-center space-x-1 justify-center hidden">
          {/* <figure>
            <Image
              src={"/favicon/favicon.png"}
              width={32}
              height={32}
              alt="favicon"
              className="bg-none"
            />
            <figcaption>This is favicon</figcaption>
          </figure> */}
          <h2 className="text-lg font-bold text-primary/80">
            BBS Tutorial Admin
          </h2>
        </div>
      </div>
      {/* <div className="bg-white  shadow-md flex items-start p-3 border-1 rounded-md  "> */}
      <div className="flex justify-center items-center relative  rounded-md shadow-md">
        <Input
          className="lg:w-[30rem] ml-2 border-none outline-none  text-gray-600 pl-7  "
          placeholder="Search..."
        />
        <Search className="w-5 h-5 ml-1 mt-1 text-gray-600 absolute left-2  " />
      </div>
      <div></div>
    </div>
  );
};

export default Topbar;
