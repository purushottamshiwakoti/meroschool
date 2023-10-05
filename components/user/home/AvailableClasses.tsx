import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Circle from "@/components/common/Circle";
import Link from "next/link";

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
            description="You can find all resources related to BBS 1st year here.... "
            href="/bbs-1st-year"
          />
          <AvailableClassesCard
            title={"bbs 2<sup>nd</sup> year"}
            image="/assets/class-4.svg"
            description="You can find all resources related to BBS 2nd year here.... "
            href="/bbs-2nd-year"
          />

          <AvailableClassesCard
            title={"bbs 3<sup>rd</sup> year"}
            image="/assets/class-3.svg"
            description="You can find all resources related to BBS 3rd year here.... "
            href="/bbs-3rd-year"
          />
          <AvailableClassesCard
            title={"bbs 4<sup>th</sup> year"}
            image="/assets/class-2.svg"
            description="You can find all resources related to BBS 4h year here.... "
            href="/bbs-4th-year"
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
  href: string;
}
const AvailableClassesCard: React.FC<AvailableClassesCardProps> = ({
  title,
  image,
  description,
  href,
}) => (
  <>
    <div className="flex items-end">
      <div className="mt-4     rounded-[2.5625rem] shadow-md p-5 space-y-3">
        <div className="h-[16.6875rem]  ">
          <Image src={image} alt={image} width={346} height={267} />
        </div>
        <div>
          <h2 className="text-[1.5rem] -mt-10 font-bold opacity-[75%] capitalize">
            {parse(title)}
          </h2>
        </div>
        <div>
          <p className="line-clamp-3 text-[1.125rem] opacity-60">
            {description}
          </p>
        </div>
        <div className="mt-1 ">
          <Link href={`/class${href}`}>
            <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] h-[2.7rem] hover:opacity-80 w-full  ">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Circle />
      </div>
    </div>
  </>
);
