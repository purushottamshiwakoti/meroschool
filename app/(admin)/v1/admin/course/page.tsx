import CourseListCard from "@/components/admin/course/CourseListCard";

async function getClasses() {
  const res = await fetch(`${process.env.NEXT_URL}/api/class`,{cache:"no-store"});
  return res.json();
}
const Course = async () => {
  const getClass = await getClasses();
  const classes = await getClass.classes;
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

