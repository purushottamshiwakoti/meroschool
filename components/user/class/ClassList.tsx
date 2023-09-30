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
import { Class, Course } from "@prisma/client";

interface CLassListProps {
  classes: Class[];
}

const CLassList: React.FC<CLassListProps> = ({ classes }) => {
  return (
    <>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-10">
          {classes.map((item) => (
            <div
              className="bg-white w-[20rem] p-2 shadow-md rounded-md"
              key={item.id}
            >
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" text-[#EE7A79]">
                    {/* BBS Class List */}
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="">
                      <ul className="space-y-5 tex-lg text-primary/60 font-semibold">
                        {((item as any).Course || []).length > 0 ? (
                          ((item as any).Course || []).map((course: Course) => (
                            <Link href={`class/${course.slug}`} key={course.id}>
                              <li className="p-3 hover:bg-primary/5">
                                {course.name}
                              </li>
                            </Link>
                          ))
                        ) : (
                          <p>No chapters added yet!</p>
                        )}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default CLassList;
