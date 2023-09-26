"use client";

import useAdminMenuStore from "@/hooks/useAdminMenuStore";
import {
  Album,
  BookCopy,
  LayoutDashboard,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    id: 1,
    name: "Dashboard",
    href: "/v1/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    name: "Course",
    href: "course",
    icon: <BookCopy />,
  },
];

const AdminLinks = () => {
  const menuStore = useAdminMenuStore();
  const path = usePathname();
  return (
    <>
      <div>
        <div>
          {links.map((item) => (
            <>
              <div
                className={` p-2 hover:bg-gray-600/10 rounded-md flex items-center mb-3 ${
                  path.includes(item.href) ? "text-[#EE7A79]" : "text-gray-600"
                }`}
                key={item.id}
              >
                <Link
                  href={item.href}
                  scroll={false}
                  className="flex space-x-3"
                >
                  {item.icon}
                  <li className={`list-none text-xl hidden lg:block  `}>
                    {menuStore.isOpen && item.name}
                  </li>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminLinks;
