import AdminContainer from "@/components/admin/components/AdminContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import EditChapterForm from "../components/EditChapterForm";
import prismadb from "@/lib/prismadb";

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  console.log(id);
  const chapter = await prismadb.chapter.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      classId: true,
      courseId: true,
      subjectId: true,
    },
  });
  const classList = await prismadb.class.findMany({});
  const courseList = await prismadb.course.findMany({});
  const subjectList = await prismadb.subject.findMany({});

  const defaultValues = {
    classId: chapter?.classId,
    courseId: chapter?.courseId,
    subjectId: chapter?.subjectId,
    name: chapter?.name,
  };

  return (
    <AdminContainer>
      <div className=" ml-4  lg:ml-[10rem]">
        <div className="flex items-center space-x-5  ">
          <Link href={"/v1/admin/chapters"}>
            <Button
              variant={"ghost"}
              className="text-[#EE7A79] hover:text-[#EE7A79]/80 "
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Go Back
            </Button>
          </Link>
          <h2 className="hidden lg:block text-2xl text-[#EE7A79] font-medium">
            Edit Chapter
          </h2>
        </div>
        <div className="mt-8">
          <EditChapterForm
            classList={classList}
            courseList={courseList}
            subjectList={subjectList}
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </AdminContainer>
  );
};

export default page;
