import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

import { ClerkProvider } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <div>
          {/* <Sidebar /> */}
          <Topbar />
          <div className="flex space-x-5">
            <Sidebar />
            {children}
          </div>
        </div>
      </ClerkProvider>
    </>
  );
}
