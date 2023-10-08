import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        {/* <Sidebar /> */}
        <Topbar />
        <div className="flex space-x-5">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
}
