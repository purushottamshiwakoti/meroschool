import Circle from "@/components/common/Circle";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const HeroSection = () => {
  return (
    <>
      <Container>
        <div className="lg:flex-row justify-between items-center mt-[6rem] flex flex-col ">
          <div className=" lg:w-[27rem]    capitalize order-3 lg:order-first ">
            <div>
              <Circle />
            </div>
            <h2 className="lg:text-[2.8125rem] md:text-[1.5rem] text-[1.2rem]  text-left  lg:text-left font-bold  opacity-[85%]  ">
              It&apos;s now easier to study online
            </h2>
            <div className="flex justify-end">
              <Circle />
            </div>
            <p className="mt-5 text-primary/80 tracking-wide">
              Embrace the Future of Learning: It&apos;s Now Easier Than Ever to
              Study Online
            </p>
            <div className="md:flex lg:flex space-y-4 md:space-y-0 lg:space-y-0  md:space-x-3 lg:space-x-3 mt-5 justify-center lg:justify-normal">
              <div>
                <Link href={"/view-classes"}>
                  <Button className="lg:w-[11.875rem] md:w-[11.875rem] lg:h-[3.125rem] md:h-[3.125rem] w-full bg-[#EE7A79] hover:bg-[#EE7A79]/80">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div></div>
              <Link href={"/view-classes"}>
                <Button
                  className="lg:w-[11.875rem] w-full md:w-[11.875rem] lg:h-[3.125rem] md:h-[3.125rem] bg-none "
                  variant={"outline"}
                >
                  Visit Class
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="relative">
              <Suspense>
                <Image
                  src={"/assets/hero.svg"}
                  alt="hero"
                  width={436}
                  height={436}
                  loading="eager"
                  // priority
                />
              </Suspense>
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
