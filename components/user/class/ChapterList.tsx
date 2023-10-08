"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import parse from "html-react-parser";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
}
const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  questions,
  slug,
  searchParams,
  presentClass,
}) => {
  const [searchValue, setSearchValue] = useState();
  // const [allQuestions, setAllQuestions] = useState(questions);
  const params = useSearchParams();
  const chapterName = params.get("chapter");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchValue) {
  //     alert(searchValue);
  //     router.replace(path, { params: searchValue });
  //   }
  // };

  return (
    <>
      {/* <div className="flex space-x-8"> */}
      <div>
        <div>
          <form className="flex -mt-[1rem]">
            <div className="flex relative items-center w-[90%] lg:w-[94%] ">
              <Input
                className=" border-none text-gray-600 pl-10   "
                placeholder="Search..."
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
              />
              <Search className="w-5 h-5 mr-2 ml-1 text-[#EE7A79] absolute left-2" />
            </div>

            <div>
              <Link
                href={{
                  query: {
                    ...(typeof searchParams === "object" ? searchParams : {}),
                    q: searchValue,
                  },
                }}
              >
                <Button type="submit" className="ml-2" disabled={!searchValue}>
                  Search
                </Button>
              </Link>
            </div>
          </form>
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
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <Link
                href={{
                  query: {
                    ...(typeof searchParams === "object" ? searchParams : {}),
                    chapter: chapter.slug,
                  },
                }}
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
            {/* <h2 className="text-lg text-[#EE7A79] font-semibold flex">
                  {parse(item.question)}
                </h2>
                <div className="text-base text-gray-700 font-normal mt-2 flex">
                  {parse(item.answer)}
                </div> */}
            <Accordion type="single" collapsible>
              <AccordionItem value={item.question}>
                <AccordionTrigger className="text-[#EE7A79]">
                  <h2 className="text-lg  font-semibold flex">
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
