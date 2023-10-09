"use client";

import SearchQuestion from "@/components/search/SearchQuestion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

interface ChapterListProps {
  chapters: {
    id: string;
    name: string;
    slug: string;
  }[];
  questions: {
    id: string;
    question: any;
    answer: any;
  }[];
  slug: string;
  searchParams: string;
  presentClass: string;
  chapterName: string;
}
const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  questions,
  slug,
  searchParams,
  presentClass,
  chapterName,
}) => {
  return (
    <>
      {/* <div className="flex space-x-8"> */}
      <div>
        <div>
          <SearchQuestion searchParams={searchParams} />
        </div>
        <div className="mt-2">
          <Link href={`/view-classes/${presentClass}`} className="bg-red-500">
            <Button
              variant={"outline"}
              className="mr-5 flex text-[#EE7A79] items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1 " />
              Back
            </Button>
          </Link>
        </div>
        <div className="flex flex-nowrap space-x-3 lg:space-x-10 w-full overflow-x-scroll  mt-3">
          <Link href={`/view-classes/${presentClass}/${slug}`}>
            <Button
              variant={chapterName === "all" ? "default" : "secondary"}
              className="p-10 truncate"
            >
              All Chapters
            </Button>
          </Link>
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <Link
                href={`/view-classes/${presentClass}/${slug}/${chapter.slug}`}
              >
                <Button
                  variant={
                    chapterName === chapter.slug ? "default" : "secondary"
                  }
                  className="p-10 truncate"
                >
                  {chapter.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <QuestionAnswerList /> */}
      {/* </div> */}
      <div className="">
        {!questions.length && (
          <div className="mt-10">
            <p className="text-center text-rose-600 text-lg">
              No question found!{" "}
            </p>
          </div>
        )}
        {questions.map((item) => (
          <div className="mt-4 bg-white p-4 rounded-md shadow-md" key={item.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value={item.question}>
                <AccordionTrigger className="text-[#EE7A79]">
                  <h2 className="text-lg  font-semibold flex text-left">
                    {parse(item.question)}
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-base text-gray-500 font-normal mt-2 ">
                    {parse(item.answer)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChapterList;
