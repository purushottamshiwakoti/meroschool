import Container from "@/components/common/Container";
import React from "react";
import ChapterList from "./ChapterList";
import QuestionAnswerList from "./QuestionAnswerList";

export interface QuestionAnswerProps {
  questions: {
    id: string;
    question: any;
    answer: any;
  }[];
  chapters: {
    id: string;
    name: string;
    slug: string;
  }[];
  slug: string;
  searchParams: string;
  presentClass: string;
  chapterName: string;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  questions,
  chapters,
  slug,
  searchParams,
  presentClass,
  chapterName,
}) => {
  // console.log(chapterName);
  return (
    <Container>
      <div className="">
        <div className="mt-[5rem] md:mt-[6.3rem]  ">
          <ChapterList
            chapters={chapters}
            questions={questions}
            slug={slug}
            searchParams={searchParams}
            presentClass={presentClass}
            chapterName={chapterName}
          />
        </div>
        {/* <QuestionAnswerList questions={questions} /> */}
      </div>
      {/* </div> */}
    </Container>
  );
};

export default QuestionAnswer;
