import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Circle from "@/components/common/Circle";

const AvailableClasses = () => {
  return (
    <Container>
      <div>
        <div>
          <h2 className="lg:text-[2.625rem] text-lg md:text-3xl font-bold mt-4">
            <span className="opacity-[85%]">Available</span>
            <span className="text-[#EE7A79]"> Classes</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          <AvailableClassesCard
            title={"bbs 1<sup>st</sup> year"}
            image="/assets/class-1.svg"
            description="is simply dummy text of the printing and typesetting industry..and typesetting ds "
          />
          <AvailableClassesCard
            title={"bbs 2<sup>nd</sup> year"}
            image="/assets/class-1.svg"
            description="is simply dummy text of the printing and typesetting industry..and typesetting ds "
          />

          <AvailableClassesCard
            title={"bbs 3<sup>rd</sup> year"}
            image="/assets/class-3.svg"
            description="is simply dummy text of the printing and typesetting industry..and typesetting ds "
          />
          <AvailableClassesCard
            title={"bbs 4<sup>th</sup> year"}
            image="/assets/class-2.svg"
            description="is simply dummy text of the printing and typesetting industry..and typesetting ds "
          />
        </div>
      </div>
    </Container>
  );
};

export default AvailableClasses;

interface AvailableClassesCardProps {
  image: string;
  title: string;
  description: string;
}
const AvailableClassesCard: React.FC<AvailableClassesCardProps> = ({
  title,
  image,
  description,
}) => (
  <>
    <div className="flex items-end">
      <div className="mt-4 w-[21.625rem]  h-[31.1875rem] rounded-[2.5625rem] shadow-md p-5 space-y-3">
        <div className="h-[16.6875rem]  ">
          <Image src={image} alt={image} width={346} height={267} />
        </div>
        <div>
          <h2 className="text-[1.5rem] font-bold opacity-[75%] capitalize">
            {parse(title)}
          </h2>
        </div>
        <div>
          <p className="line-clamp-3 text-[1.125rem] opacity-60">
            {description}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80">
            Start Learning
          </Button>
        </div>
      </div>
      <div>
        <Circle />
      </div>
    </div>
  </>
);
