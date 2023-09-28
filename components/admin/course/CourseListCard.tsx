"use client";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import { Class as ClassType, Course as CourseType } from "@prisma/client"; // Import types from Prisma

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Class } from "@prisma/client";
import AdminContainer from "../components/AdminContainer";
import AdminCourse from "./AdminCourse";
import AddClassModal from "../modals/AddClassModal";
import useAdminModalStore from "@/hooks/useAdminModalStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModal from "../modals/DeleteModal";
import useAdminDeleteModalStore from "@/hooks/useAdminDeleteModalStore";
import AddCourseModal from "../modals/AddCourseModal ";
import useAdminCourseModalStore from "@/hooks/useAdminCourseModalStore ";
import { string } from "zod";

interface CourseListCardProps {
  // class: {
  //   id: string;
  //   name: string;
  //   created_at: Date;
  //   updated_at: Date;
  //   course: {
  //     id: string;
  //     name: string;
  //     created_at: Date;
  //     updated_at: Date;
  //   }[];
  // }[];
  class: any;
}

const CourseListCard: React.FC<CourseListCardProps> = ({ class: classes }) => {
  const url = window.location.origin;
  const [classValue, setClassValue] = useState("");
  const [courseValue, setCourseValue] = useState("");
  const [className, setClassName] = useState("");
  const router = useRouter();
  const deleteModal = useAdminDeleteModalStore();
  // adminModal.openModal();
  const [loading, setLoading] = useState(false);
  const [editClassMode, setEditClassMode] = useState<string | null>(null);
  const courseModal = useAdminCourseModalStore();

  const addCourse = (id: string) => {
    console.log(id);
    setCourseValue(id);
    courseModal.openModal();
  };
  const handleEditCourse = (id: string) => {
    alert(id);
  };
  const handleDeleteCourse = (id: string) => {
    alert(id);
  };
  const handleEditClass = (id: string, initialName: string) => {
    setEditClassMode(id);
    setClassName(initialName);
  };
  const handleDeleteClass = async (id: any) => {
    try {
      const res = await axios.delete(`${url}/api/class/${id}`);
      setLoading(true);
      toast.success(res.data.message);
      router.refresh();
      deleteModal.closeModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateClass = async (
    id: string,
    e: React.FormEvent<EventTarget>
  ) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${url}/api/class/${id}`, {
        name: className,
      });
      toast.success(res.data.message);
      setEditClassMode(null);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  return (
    <>
      <AddCourseModal
        header="Create Course"
        defaultValue={{ name: "" }}
        classId={courseValue}
      />
      {classValue !== "" && (
        <DeleteModal
          isLoading={loading}
          onConfirm={() => handleDeleteClass(classValue)}
          setIsLoading={setLoading}
          title="Are you sure absolutely sure ?"
          description="
          This action cannot be undone. This will permanently delete classes and course lists data from our servers."
        />
      )}

      <AdminContainer>
        <div className="flex space-x-4 ">
          <div className="flex ml-4 flex-wrap lg:ml-[10rem]">
            <div className="mt-2 ml-4 mr-[0.7rem]">
              <AdminCourse />
            </div>
            {classes?.map((item: ClassType) => (
              <div key={item.id}>
                <div className="w-auto border-2 p-1 border-[#EE7A79] rounded-md shadow-md flex flex-row m-3">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    className="pl-2  "
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[#EE7A79]  ">
                        <div className="flex items-center justify-between space-x-[3rem]">
                          {editClassMode === item.id ? (
                            <>
                              <form
                                action=""
                                onSubmit={(e: React.FormEvent<EventTarget>) =>
                                  handleUpdateClass(item.id, e)
                                }
                              >
                                <Input
                                  name="class"
                                  value={className}
                                  onChange={(e) => setClassName(e.target.value)}
                                />
                                {/* <button className="hidden">Submit</button> */}
                              </form>
                            </>
                          ) : (
                            <h2
                              className=" truncate line-clamp-1"
                              onDoubleClick={() => setEditClassMode(item.id)}
                            >
                              {item.name}
                            </h2>
                          )}
                          <div className="flex space-x-2 items-center">
                            <Pencil
                              className="w-4 h-4"
                              color="green"
                              onClick={() =>
                                handleEditClass(item.id, item.name)
                              }
                            />
                            <Trash
                              className="w-4 h-4"
                              color="red"
                              onClick={() => {
                                deleteModal.openModal(), setClassValue(item.id);
                              }}
                            />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <ul className="space-y-2 text-primary/80  ">
                            {((item as any).courses || []).map(
                              (course: CourseType) => (
                                <div
                                  className="shadow-md cursor-pointer "
                                  key={course.id}
                                >
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                      <AccordionTrigger className="text-[#EE7A79]">
                                        <div className="flex px-2 justify-between w-full">
                                          <div className="text-[#EE7A79]">
                                            {course.name}
                                          </div>
                                          <div className="flex space-x-2">
                                            <Pencil
                                              className="w-4 h-4"
                                              color="green"
                                              onClick={() =>
                                                handleEditCourse(course.id)
                                              }
                                            />
                                            <Trash
                                              className="w-4 h-4"
                                              color="red"
                                              onClick={() =>
                                                handleDeleteCourse(course.id)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div
                                          className="flex items-center  text-white p-1 rounded-md shadow-md cursor-pointer mt-4 bg-[#EE7A79] "
                                          onClick={() => addCourse(item.id)}
                                        >
                                          <PlusCircle className="w-4 h-4 mr-1" />
                                          Add Chapters
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              )
                            )}
                          </ul>
                          <div
                            className="flex items-center  text-white p-1 rounded-md shadow-md cursor-pointer mt-4 bg-[#EE7A79] "
                            onClick={() => addCourse(item.id)}
                          >
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Add Course
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default CourseListCard;
