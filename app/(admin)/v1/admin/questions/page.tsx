import AdminContainer from "@/components/admin/components/AdminContainer";
import { DataTable } from "@/components/admin/data-table";
import { Questioncolumns } from "@/components/admin/question/table/columns";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

async function getQuestions() {
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/question`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await res.json();
    return data.questions || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

const Question = async () => {
  const allQetuestions = await getQuestions();
  console.log(allQetuestions);
  const questions = allQetuestions;
  const data = questions?.map((item: any) => ({
    id: item.id || "",
    subject: item.subjects.name || "",
    class: item.classes.name || "",
    course: item.courses.name || "",
    question: item.question || "",
    chapter: item.chapters.name || "",
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
