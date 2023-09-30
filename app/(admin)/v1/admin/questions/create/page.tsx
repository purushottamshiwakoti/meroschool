import AdminContainer from "@/components/admin/components/AdminContainer";
import AddEditQuestionForm from "@/components/admin/forms/AddEditQuestionForm";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateQuestion = async () => {
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
  const courses = await prismadb.course.findMany();
  const chapters = await prismadb.chapter.findMany();
  return (
    <>
      <AdminContainer>
        <div className=" ml-4  lg:ml-[10rem]">
          <div className="flex items-center space-x-5  ">
            <Link href={"/v1/admin/questions"}>
              <Button
                variant={"ghost"}
                className="text-[#EE7A79] hover:text-[#EE7A79]/80 "
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Go Back
              </Button>
            </Link>
            <h2 className="hidden lg:block text-2xl text-[#EE7A79] font-medium">
              Add Question
            </h2>
          </div>

          {/* add edit question  */}
          <div className="mt-8">
            <AddEditQuestionForm
              classes={classes}
              courses={courses}
              chapters={chapters}
            />
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default CreateQuestion;
