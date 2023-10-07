import Container from "@/components/common/Container";
import React from "react";
import SuggestionItem from "@/components/user/home/Suggestion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggestion",
  description:
    "Share Your Insights: BBS Website Suggestion Page. Contribute to enhancing user experience and improving our BBS exam resource website. Join us!",
  alternates: {
    canonical: "/",
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
