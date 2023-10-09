import QuestionAnswer from "@/components/user/class/QuestionAnswer";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

const getQuestions = async ({
  courseName,
  chapterName,
  presentClass,
  searchKey,
}) => {
  const res = await fetch(`${process.env.NEXT_URL}/api/search/question`, {
    method: "POST",
    body: JSON.stringify({ chapterName, presentClass, courseName, searchKey }),
  });
  return await res.json();
};

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const courseName = params.chapter;
  const presentClass = params.class;
  const searchKey = searchParams.q;

  const chapterName = params.slug;
//   console.log(chapterName);

  const allQuestions = await getQuestions({
    chapterName,
    presentClass,
    courseName,
    searchKey,
  });

  // const questionsList = await prismadb.question.findMany({
  //   where: {
  //     question: {
  //       contains: searchKey,
  //       mode: "insensitive",
  //     },
  //     subjects: {
  //       slug: courseName,
  //     },
  //     chapters: {
  //       slug: searchParams.chapter,
  //     },
  //   },
  // });
  const questionsList = allQuestions.questions;
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
          presentClass={presentClass}
          chapterName={chapterName}
        />
      </div>
    </>
  );
};

export default page;
