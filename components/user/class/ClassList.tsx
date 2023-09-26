import React from "react";
import parser from "html-react-parser";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/common/Container";
import Link from "next/link";

const CLassList = () => {
  const classes = [
    {
      id: 1,
      name: " BBS 1<sup>st</sup> Year",
      href: "/bbs-1st-year",
    },
    {
      id: 2,
      name: " BBS 2<sup>nd</sup> Year",
      href: "/bbs-2nd-year",
    },
    {
      id: 3,
      name: " BBS 3<sup>rd</sup> Year",
      href: "/bbs-3rd-year",
    },
    {
      id: 4,
      name: " BBS 4<sup>th</sup> Year",
      href: "/bbs-4th-year",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Container>
          <div className="bg-white w-[20rem] p-2 shadow-md rounded-md">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-primary/80">
                  BBS Class List
                </AccordionTrigger>
                <AccordionContent>
                  <div className="">
                    <ul className="space-y-5 tex-lg text-primary/60 font-semibold">
                      {classes.map((item) => (
                        <Link href={`class${item.href}`} key={item.id}>
                          <li className="p-3">{parser(item.name)}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CLassList;
