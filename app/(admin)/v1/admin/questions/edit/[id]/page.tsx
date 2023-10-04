import AdminContainer from "@/components/admin/components/AdminContainer";
import EditQuestionForm from "@/components/admin/forms/EditQuestionForm";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const EditQuestion = async ({ params }: { params: any }) => {
  const id = params.id;
  const question = await prismadb.question.findFirst({
    where: {
      id,
    },
  });
  const defaultValues = {
    classId: question?.classId,
    courseId: question?.courseId,
    chapterId: question?.subjectId,
    question: question?.question,
    answer: question?.answer,
  };
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
              View Question
            </h2>
          </div>

          {/* add edit question  */}
          <div className="mt-8">
            <EditQuestionForm
              chapters={chapters}
              classes={classes}
              courses={courses}
              defaultValues={defaultValues}
              id={id}
            />
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default EditQuestion;
