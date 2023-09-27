"use client";

import useAdminMenuStore from "@/hooks/useAdminMenuStore";
import AdminLinks from "./components/AdminLinks";

const Sidebar = () => {
  const menuStore = useAdminMenuStore();
  return (
    <div
      className={`${
        !menuStore.isOpen ? "w-[4rem]" : "lg:w-[12rem] w-[4rem] "
      } p-4 bg-white min-h-screen shadow-md border-l-2 mt-[4rem] fixed`}
    >
      <div>
        <AdminLinks />
      </div>
    </div>
  );
};

export default Sidebar;
