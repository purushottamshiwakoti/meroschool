import QuestionAnswer from "@/components/user/class/QuestionAnswer";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

const getQuestions = async ({ searchKey, courseName, chapterName }) => {
  const res = await fetch(`${process.env.NEXT_URL}/api/search/question`, {
    method: "POST",
    body: JSON.stringify({ searchKey, courseName, chapterName }),
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

  const chapterName = searchParams.chapter;

  const allQuestions = await getQuestions({
    chapterName,
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
        />
      </div>
    </>
  );
};

export default page;
