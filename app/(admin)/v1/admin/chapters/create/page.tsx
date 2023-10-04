import AdminContainer from "@/components/admin/components/AdminContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CreateChapterForm from "./components/CreateChapterForm";
import prismadb from "@/lib/prismadb";
import DeleteChapter from "../components/DeleteChapter";

const page = async () => {
  const classList = await prismadb.class.findMany({});
  const courseList = await prismadb.course.findMany({});
  const subjectList = await prismadb.subject.findMany({});
  return (
    <>
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
              Add Chapters
            </h2>
          </div>
          <div className="mt-8">
            <CreateChapterForm
              classList={classList}
              courseList={courseList}
              subjectList={subjectList}
            />
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default page;
