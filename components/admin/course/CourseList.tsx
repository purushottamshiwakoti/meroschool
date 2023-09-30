import React from "react";
import CourseListCard from "./CourseListCard";

import prismadb from "@/lib/prismadb";

const CourseList = async () => {
  const classes = await prismadb.class.findMany({});

  return (
    <div className="w-56 p-1 min-h-80 shadow-md rounded-md border-solid border-2 border-[#EE7A79] mb-4 ">
      <CourseListCard classes={classes} />
    </div>
  );
};

export default CourseList;
