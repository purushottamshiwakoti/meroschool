"use client";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

const Footer = () => {
  const date = new Date();
  const path = usePathname();

  return (
    <>
      <div className={`mt-10 ${path.includes("admin") && "hidden"}`}>
        <Separator />
        <div className="flex items-center justify-center w-full p-5">
          <p className="text-primary/60 ">
            Copyright ©{date.getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
