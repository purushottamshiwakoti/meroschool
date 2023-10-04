"use client";

import useAdminMenuStore from "@/hooks/useAdminMenuStore";
import {
  Album,
  BookCopy,
  BookOpenCheck,
  FileQuestion,
  LayoutDashboard,
  MapPin,
  Send,
  StickyNote,
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
    href: "/v1/admin/course",
    icon: <BookCopy />,
  },
  {
    id: 5,
    name: "Chapters",
    href: "/v1/admin/chapters",
    icon: <BookOpenCheck />,
  },
  {
    id: 3,
    name: "Questions",
    href: "/v1/admin/questions",
    icon: <FileQuestion />,
  },
  {
    id: 4,
    name: "Notes",
    href: "/v1/admin/notes",
    icon: <StickyNote />,
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
                  <div className="w-4 h-4">{item.icon}</div>
                  <li className={`list-none text-base hidden lg:block  `}>
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
