"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import useMenuStore from "@/hooks/useMenuStore";
import Circle from "@/components/common/Circle";
import { ColorSwitcher } from "@/components/common/ColorSwitcher";

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Class", href: "/class" },
  { id: 3, name: "Suggestion", href: "/suggestion" },
];

const NavLinks = () => {
  const pathname = usePathname();
  const menuState = useMenuStore();
  return (
    <>
      <div>
        <div className=" flex justify-end" onClick={menuState.handleChange}>
          {menuState.isOpen ? (
            <X className="text-primary/50 lg:hidden md:hidden w-8 h-8" />
          ) : (
            <Menu className="text-primary/50 lg:hidden md:hidden w-8 h-8" />
          )}
        </div>
        <div
          className={`lg:flex md:flex space-x-[2.94rem] ${
            menuState.isOpen ? "block " : "hidden"
          }`}
        >
          {links?.map((item) => (
            <Link href={item.href} key={item.id}>
              <div
                className={`mt-5 text-[1.125rem]  font-[500]  text-primary/50 hover:bg-gray-400/20 p-1 rounded-md ${
                  pathname === item.href ? "border-b-4 border-[#EE7A79]" : ""
                }`}
                onClick={menuState.onClose}
              >
                {item.name}
              </div>
            </Link>
          ))}
          <div className="flex float-right md:hidden lg:hidden">
            <ColorSwitcher />
          </div>
        </div>
      </div>
      <div className="mt-2 ml-4">
        <Circle />
      </div>
    </>
  );
};

export default NavLinks;
