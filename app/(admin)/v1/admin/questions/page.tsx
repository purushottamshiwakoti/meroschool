import AdminContainer from "@/components/admin/components/AdminContainer";
import { DataTable } from "@/components/admin/data-table";
import { Questioncolumns } from "@/components/admin/question/table/columns";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Question = async () => {
  const questions = await prismadb.question.findMany({
    include: {
      subjects: {
        select: {
          name: true,
        },
      },
      classes: {
        select: {
          name: true,
        },
      },
      courses: {
        select: {
          name: true,
        },
      },
    },
  });

  const data = questions.map((item) => ({
    id: item.id,
    chapter: item.subjects.name,
    class: item.classes.name,
    course: item.courses.name,
    question: item.question,
  }));
  return (
    <AdminContainer>
      <div className=" ml-4  lg:ml-[10rem]">
        <div className="flex items-center justify-between">
          <h2 className="hidden lg:block text-2xl text-[#EE7A79] font-medium">
            Question List
          </h2>
          <Link href={"/v1/admin/questions/create"}>
            <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Question
            </Button>
          </Link>
        </div>

        {/* data table  */}
        <div className="max-w-screen overflow-x-auto">
          <DataTable
            columns={Questioncolumns}
            data={data}
            filterKey="question"
          />
        </div>
      </div>
    </AdminContainer>
  );
};

export default Question;
