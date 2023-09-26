import React from "react";

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-[4.5rem] w-full px-10">{children}</div>;
};

export default AdminContainer;
