"use client";

import Container from "@/components/common/Container";
import NavLinks from "./components/NavLinks";
import { ColorSwitcher } from "@/components/common/ColorSwitcher";

import useMenuStore from "@/hooks/useMenuStore";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const menuState = useMenuStore();
  const path = usePathname();
  return (
    <div className={`${path.includes("admin") ? "hidden" : ""}`}>
      <div className="fixed  w-full z-10  top-0  bg-[#FDFAF3] dark:bg-black/30  opacity-100 ">
        <Container>
          <nav className="flex items-center justify-between  ">
            <div
              className={`${
                menuState.isOpen ? "hidden" : ""
              } md:block lg:block`}
            >
              <Link href={"/"}>
                <div className="flex space-x-1 items-center justify-center">
                  <Image
                    src={"/favicon/favicon.png"}
                    width={32}
                    height={32}
                    alt="favicon"
                    className="bg-[#FDFAF3]"
                  />
                  <h2 className="text-lg font-bold text-primary/80">
                    BBS Tutorial
                  </h2>
                </div>
              </Link>
            </div>
            <div
              className={`order-4 ${
                menuState.isOpen ? "h-[100vh] p-2  " : ""
              } md:h-auto lg:h-auto  grow md:grow-0 lg:grow-0`}
            >
              <NavLinks />
            </div>
            <div className="lg:order-5 md:order-5 hidden md:block lg:block ">
              <ColorSwitcher />
            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
