import QuestionAnswer from "@/components/user/class/QuestionAnswer";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const courseName = params.chapter;
  const searchKey = searchParams.q;

  const questionsList = await prismadb.question.findMany({
    where: {
      question: {
        contains: searchKey,
        mode: "insensitive",
      },
      subjects: {
        slug: courseName,
      },
      chapters: {
        slug: searchParams.chapter,
      },
    },
  });
  const chapterList = await prismadb.chapter.findMany({
    where: {
      subjects: {
        slug: courseName,
      },
    },
  });

  const chapters = chapterList.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
  }));
  const questions = questionsList.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));
  return (
    <>
      <div>
        <QuestionAnswer
          questions={questions}
          chapters={chapters}
          slug={courseName}
          searchParams={searchParams}
        />
      </div>
    </>
  );
};

export default page;
