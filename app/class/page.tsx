import CLassList from "@/components/user/class/ClassList";
import prismadb from "@/lib/prismadb";
import React from "react";

const Class = async () => {
  const allCLasses = await prismadb.class.findMany({
    include: {
      Course: true,
    },
  });
  return (
    <>
      <div className="mt-[7rem]">
        <CLassList classes={allCLasses} />
      </div>
    </>
  );
};

export default Class;
