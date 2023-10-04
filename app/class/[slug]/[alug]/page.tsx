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
  const slug = params.slug;
  console.log(slug);
  const search = searchParams;
  console.log({ search });

  const questionsList = await prismadb.question.findMany({
    where: {
      courses: {
        slug,
      },
    },
  });
  console.log(questionsList);
  console.log({ questionsList });
  const chapterList = await prismadb.chapter.findMany({
    where: {
      courses: {
        slug: slug,
      },
    },
  });

  console.log({ chapterList });
  const chapters = chapterList.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
  }));
  console.log(chapters);
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
          slug={slug}
          searchParams={searchParams}
        />
      </div>
    </>
  );
};

export default page;
