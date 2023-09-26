import React from "react";

import { Pencil, PlusCircle, Trash } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseList = () => {
  const addCourse = () => {
    alert("jjj");
  };
  const handleEditCourse = () => {
    alert("jjj");
  };
  const handleDeleteCourse = () => {
    alert("jjj");
  };
  const handleEditClass = () => {
    alert("jjj");
  };
  const handleDeleteClass = () => {
    alert("jjj");
  };

  return (
    <div className="w-56 p-1 min-h-80 shadow-md rounded-md border-solid border-2 border-[#EE7A79] mb-4 ">
      <Accordion
        type="single"
        collapsible
        className=" p-2 shadow-md rounded-md "
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[#EE7A79] ">
            <div className="flex space-x-8">
              <h2>BBS 4 Years</h2>
              <div className="flex space-x-2 items-center">
                <Pencil
                  className="w-4 h-4"
                  color="green"
                  onClick={handleEditClass}
                />
                <Trash
                  className="w-4 h-4"
                  color="red"
                  onClick={handleDeleteClass}
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <ul className="space-y-2 text-primary/80  ">
                <div className="p-2 shadow-md cursor-pointer flex justify-between items-center">
                  <li>BBS 1st Year</li>
                  <div className="flex space-x-2">
                    <Pencil
                      className="w-4 h-4"
                      color="green"
                      onClick={handleEditCourse}
                    />
                    <Trash
                      className="w-4 h-4"
                      color="red"
                      onClick={handleDeleteCourse}
                    />
                  </div>
                </div>
                <div className="p-2 shadow-md cursor-pointer flex justify-between items-center">
                  <li>BBS 1st Year</li>
                  <div className="flex space-x-2">
                    <Pencil
                      className="w-4 h-4"
                      color="green"
                      onClick={handleEditCourse}
                    />
                    <Trash
                      className="w-4 h-4"
                      color="red"
                      onClick={handleDeleteCourse}
                    />
                  </div>
                </div>
                <div className="p-2 shadow-md cursor-pointer flex justify-between items-center">
                  <li>BBS 1st Year</li>
                  <div className="flex space-x-2">
                    <Pencil
                      className="w-4 h-4"
                      color="green"
                      onClick={handleEditCourse}
                    />
                    <Trash
                      className="w-4 h-4"
                      color="red"
                      onClick={handleDeleteCourse}
                    />
                  </div>
                </div>
              </ul>
              <div
                className="flex items-center  text-white p-1 rounded-md shadow-md cursor-pointer mt-4 bg-[#EE7A79] "
                onClick={addCourse}
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Course
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CourseList;
