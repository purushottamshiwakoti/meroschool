"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import parse from "html-react-parser";
import { Search } from "lucide-react";
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
}
const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  questions,
  slug,
  searchParams,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [allQuestions, setAllQuestions] = useState(questions);
  const params = useSearchParams();
  const chapterName = params.get("chapter");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchValue);
  };

  return (
    <>
      {/* <div className="flex space-x-8"> */}
      <div>
        <form onClick={(e: any) => handleSearch(e)}>
          <div
            className="flex  items-center border-primary/50 border-1 rounded-md mr-[10rem] shadow-md focus-visible:ring-[#EE7A79] fixed  w-[92%] md:w-[95.5%] lg:w-[84%] -mt-[3rem] lg:-mt-[4.2rem] bg-white backdrop-blur-sm"
            // style={{ width: "92%" }}
          >
            <Input
              className=" border-none text-gray-600 pl-10 "
              placeholder="Search..."
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
            />
            <Search className="w-5 h-5 mr-2 ml-1 text-[#EE7A79] absolute left-2" />
            <button type="submit" className="hidden">
              Search
            </button>
          </div>
        </form>
        <div className="flex flex-nowrap space-x-3 lg:space-x-10 w-full overflow-x-scroll mt-[7rem]  md:mt-[9rem]  lg:mt-[9.5rem]">
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <Link
                href={{
                  query: {
                    chapter: chapter.slug,
                  },
                }}
              >
                <Button
                  variant={
                    chapterName === chapter.slug ? "default" : "secondary"
                  }
                  className="p-10"
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
        {!allQuestions.length && (
          <div className="mt-10">
            <p className="text-center text-rose-600 text-lg">
              No question found!{" "}
            </p>
          </div>
        )}
        {allQuestions.map((item) => (
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
                  <div className="text-base text-gray-700 font-normal mt-2 flex">
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
