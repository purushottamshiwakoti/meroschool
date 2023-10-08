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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {classes.map((item) => (
            <div
              className="bg-white w-[20rem] p-2 shadow-md rounded-md mb-5   "
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
                      <div className="space-y-5 k">
                        {((item as any).Course || []).length > 0 ? (
                          ((item as any).Course || []).map((course: Course) => (
                            <Link href={`view-classes/${course.slug}`} key={course.id}>
                              <div className="p-3 hover:bg-primary/5">
                                {course.name}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p>No Courses added yet!</p>
                        )}
                      </div>
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
