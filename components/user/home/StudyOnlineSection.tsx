import Circle from "@/components/common/Circle";
import Container from "@/components/common/Container";
import Image from "next/image";
import React from "react";

const StudyOnlineSection = () => {
  return (
    <Container>
      <div className="-mt-3 relative">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between ">
          <div className="flex justify-around w-full px-4">
            <div className="flex items-center justify-center space-x-6">
              <div>
                <div className="flex justify-end">
                  <Circle />
                </div>
                <div className=" w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full flex items-center justify-center  lg:w-[350px] lg:h-[350px]">
                  <Image
                    src="/assets/img-1.svg"
                    alt="img-1"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-end items-end">
                  <Circle />
                </div>
                <h2 className="md:text-2xl lg:text-[2.625rem] font-bold opacity-[85%] capitalize text-base">
                  prepare for your exams
                </h2>
                <div>
                  <div className="flex  lg:justify-center text-primary/50 lg:mt-[3rem] mt-2">
                    <p className="lg:w-[31.5625rem] lg:-mt-4 md:line-clamp-4 text-sm tracking-wide lg:text-[1.125rem]  px-3 capitalize line-clamp-2 lg:line-clamp-5">
                      Empowering Your Path to Success: Let&apos;s Get Ready for
                      Your Exams
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Circle />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="text-white bg-black bg-opacity-50 p-2 rounded-lg">
              Hi
            </div> */}
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 1240 568"
            className="mt-5 lg:mt-0"
          >
            <path
              fill="#EE7A79"
              fillOpacity="0.15"
              d="M0 12.125c347.5 103.5 1084-55.5 1240 0v493c-475.488 63.973-741.957 100.701-1240 0v-493z"
            ></path>
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default StudyOnlineSection;
