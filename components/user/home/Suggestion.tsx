import Container from "@/components/common/Container";
import React from "react";
import SuggestionForm from "./forms/SuggestionForm";

const Suggestion = () => {
  return (
    <div className="lg:mt-10 mt-7">
      <Container>
        <div className="flex flex-col lg:justify-center lg:items-center ">
          <h2 className="lg:text-[2.625rem] text-lg md:text-3xl font-bold ">
            <span className="opacity-[85%]">Sugget</span>
            <span className="text-[#EE7A79]"> Us</span>
          </h2>
          <p className="mt-4 text-primary/50 capitalize">
            How can we imporove our website in your assistance
          </p>
        </div>
        <div>
          <SuggestionForm />
        </div>
      </Container>
    </div>
  );
};

export default Suggestion;
