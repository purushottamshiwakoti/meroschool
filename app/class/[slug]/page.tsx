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
  const search = searchParams.search;
  console.log({ search });
  const courseExists = await prismadb.course.findFirst({
    where: {
      slug,
    },
    select: {
      name: true,
    },
  });
  if (!courseExists) return redirect("/class");
  const questionsList = await prismadb.question.findMany({
    where: {
      question: {
        mode: "insensitive",
        contains: search,
      },
    },
  });
  console.log(questionsList);
  const chapterList = await prismadb.question.findMany({
    where: {
      courses: {
        slug: slug,
      },
    },

    include: {
      courses: {
        select: {
          slug: true,
        },
      },
      chapters: {
        select: {
          name: true,
          id: true,
          slug: true,
        },
      },
    },
  });

  const chapters = chapterList.map((item) => ({
    id: item.chapters.id,
    name: item.chapters.name,
    slug: item.chapters.slug,
  }));
  // console.log(chapters);
  const questions = questionsList.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));
  return (
    <>
      <div>
        <QuestionAnswer questions={questions} chapters={chapters} slug={slug} />
      </div>
    </>
  );
};

export default page;
