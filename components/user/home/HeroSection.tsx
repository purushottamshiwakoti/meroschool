import Circle from "@/components/common/Circle";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <Container>
        <div className="lg:flex-row justify-between items-center mt-10 flex flex-col ">
          <div className=" lg:w-[27rem]    capitalize order-3 lg:order-first ">
            <div>
              <Circle />
            </div>
            <h2 className="lg:text-[2.8125rem] md:text-[1.5rem] text-[1.2rem]  text-left  lg:text-left font-bold  opacity-[85%]  ">
              It’s now easier to study online
            </h2>
            <div className="flex justify-end">
              <Circle />
            </div>
            <p className="mt-5 text-primary/50">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy .
            </p>
            <div className="flex space-x-3 mt-5 justify-center lg:justify-normal">
              <Button className="lg:w-[11.875rem] md:w-[11.875rem] lg:h-[3.125rem] md:h-[3.125rem] bg-[#EE7A79] hover:bg-[#EE7A79]/80">
                Get Started
              </Button>
              <Button
                className="lg:w-[11.875rem] md:w-[11.875rem] lg:h-[3.125rem] md:h-[3.125rem] bg-none "
                variant={"outline"}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <div className="relative">
              <Image
                src={"/assets/hero.svg"}
                alt="hero"
                width={436}
                height={436}
              />
            </div>
            <div className="absolute top-[12rem] px-10">
              <Circle />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HeroSection;