import Container from "@/components/common/Container";
import prismadb from "@/lib/prismadb";
import SubjectListCard from "./components/SubjectListCard";
import { Home, Slash } from "lucide-react";
import Link from "next/link";

const page = async ({ params }: { params: any }) => {
  console.log(params);
  const courseSlug = params.class;
  const getSubjects = await prismadb.course.findFirst({
    where: {
      slug: courseSlug,
    },
    select: {
      name: true,
      Subject: {
        select: {
          name: true,
          id: true,
          slug: true,
        },
      },
    },
  });
  const allSubjects = await getSubjects?.Subject.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
  }));

  return (
    <Container>
      <div className="mt-[6rem]    font-medium text-primary/80  text-lg flex space-x-1 ">
        <div>
          <Link href="/">
            <Home className="hover:underline cursor-pointer" />
          </Link>
        </div>
        <div>/</div>
        <Link href={"/class"}>
          <h2 className="hover:underline cursor-pointer">Class</h2>
        </Link>
        <div>/</div>
        <h2 className="capitalize hover:underline text-[#EE7A79] cursor-pointer">
          {courseSlug}
        </h2>
      </div>
      <div className="mt-3  bg-white lg:w-1/3 h-auto p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-medium text-[#EE7A79]">
          Subjects list for
          <span> {getSubjects?.name}</span>
        </h2>
        <div className="mt-2 ">
          {allSubjects?.map((subject) => (
            <div key={subject.id}>
              <SubjectListCard
                name={subject.name}
                slug={subject.slug}
                courseSlug={courseSlug}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default page;
