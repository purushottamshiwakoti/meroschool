import CourseListCard from "@/components/admin/course/CourseListCard";

async function getClasses() {
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/class`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
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
