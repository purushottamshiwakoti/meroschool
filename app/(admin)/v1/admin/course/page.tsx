import AdminCourse from "@/components/admin/course/AdminCourse";
import CourseListCard from "@/components/admin/course/CourseListCard";
import prismadb from "@/lib/prismadb";
import React from "react";

const Course = async () => {
  const classes = await prismadb.class.findMany({});

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
