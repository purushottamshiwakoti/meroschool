"use client";

import Container from "@/components/common/Container";
import NavLinks from "./components/NavLinks";
import { ColorSwitcher } from "@/components/common/ColorSwitcher";

import useMenuStore from "@/hooks/useMenuStore";

const Navbar = () => {
  const menuState = useMenuStore();
  return (
    <div className=" dark:bg-black/30 h-auto">
      <Container>
        <nav className="flex items-center justify-between ">
          <div
            className={`${menuState.isOpen ? "hidden" : ""} md:block lg:block`}
          >
            <h2 className="text-lg font-bold text-primary/80">BBS Tutorial</h2>
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
  );
};

export default Navbar;
