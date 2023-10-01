import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:mx-[120px] md:mx-[20px] mx-[15px]  ">{children}</div>
  );
};

export default Container;
