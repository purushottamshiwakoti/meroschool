import AdminCourse from "@/components/admin/course/AdminCourse";
import CourseListCard from "@/components/admin/course/CourseListCard";
import prismadb from "@/lib/prismadb";
import { Class } from "@prisma/client";
import React from "react";

const Course = async () => {
  const classes: any[] = await prismadb.class.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      Course: {
        include: {
          Chapter: true,
        },
      },
    },
  });
  return (
    <>
      <div>
        <div>
          <CourseListCard class={classes} />
        </div>
      </div>
    </>
  );
};

export default Course;
