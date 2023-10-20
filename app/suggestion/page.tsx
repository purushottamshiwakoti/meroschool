import Container from "@/components/common/Container";
import React from "react";
import SuggestionItem from "@/components/user/home/Suggestion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggestion",
  description:
    "How to improve BBS Tutorail? This suggestions will help us to make our website more user friendly and we will work on what user needs ",
  alternates: {
    // canonical: "/suggestion",
    languages: {
      "en-US": "/en-US",
    },
  },
};
const Suggestion = () => {
  return (
    <>
      <div className="pt-[4rem]">
        <SuggestionItem />
      </div>
    </>
  );
};

export default Suggestion;
