import CourseListCard from "@/components/admin/course/CourseListCard";
import prismadb from "@/lib/prismadb";

const Course = async () => {
  const classes: any[] = await prismadb.class.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      Course: {
        include: {
          Subject: true,
        },
      },
    },
  });

  return (
    <>
      <div>
        <div>
          <CourseListCard classes={classes} />
        </div>
      </div>
    </>
  );
};

export default Course;
