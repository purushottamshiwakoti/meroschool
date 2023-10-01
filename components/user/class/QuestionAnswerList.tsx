import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

import parse from "html-react-parser";

interface QuestionAnswerListProps {
  questions: {
    id: string;
    question: any;
    answer: any;
  }[];
}

const QuestionAnswerList: React.FC<QuestionAnswerListProps> = ({
  questions,
}) => {
  return (
    <>
      <div className="">
        <div className="">
          {questions.map((item) => (
            <div
              className="mt-4 bg-white p-4 rounded-md shadow-md"
              key={item.id}
            >
              <h2 className="text-lg text-[#EE7A79] font-semibold flex">
                {parse(item.question)}
              </h2>
              <div className="text-base text-gray-700 font-normal mt-2 flex">
                {parse(item.answer)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionAnswerList;
