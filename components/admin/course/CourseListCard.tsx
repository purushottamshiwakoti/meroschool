"use client";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import { Class as ClassType, Course as CourseType } from "@prisma/client"; // Import types from Prisma

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import useAdminChapterModalStore from "@/hooks/useAdminChapterModalStore ";
import useAdminCourseModalStore from "@/hooks/useAdminCourseModalStore ";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AdminContainer from "../components/AdminContainer";
import AddChapterModal from "../modals/AddChapterModal ";
import AddCourseModal from "../modals/AddCourseModal ";
import DeleteClassModal from "../modals/DeleteClassModal";
import DeleteCourseModal from "../modals/DeleteCourseModal";
import AdminCourse from "./AdminCourse";
import useAdminDeleteClassModalStore from "@/hooks/useAdminDeleteClassModalStore";
import useAdminDeleteCourseModalStore from "@/hooks/useAdminDeleteCourseModalStore";
import useAdminDeleteChapterModalStore from "@/hooks/useAdminDeleteChapterModalStore";
import DeleteChapterModal from "../modals/DeleteChapterModal";

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
  classes: any[];
}

const CourseListCard: React.FC<CourseListCardProps> = ({ classes }) => {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const [classValue, setClassValue] = useState("");
  const [courseValue, setCourseValue] = useState("");
  const [chapterValue, setChapterValue] = useState("");
  const [className, setClassName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const router = useRouter();
  const deleteClassModal = useAdminDeleteClassModalStore();
  const deleteCourseModal = useAdminDeleteCourseModalStore();
  const deleteChapterModal = useAdminDeleteChapterModalStore();
  // adminModal.openModal();
  const [loading, setLoading] = useState(false);
  const [editClassMode, setEditClassMode] = useState<string | null>(null);
  const [editCourseMode, setEditCourseMode] = useState<string | null>(null);
  const [editChapterMode, setEditChapterMode] = useState<string | null>(null);
  const courseModal = useAdminCourseModalStore();
  const chapterModal = useAdminChapterModalStore();

  const addCourse = (id: string) => {
    setCourseValue(id);
    courseModal.openModal();
  };
  const handleEditCourse = (id: string, initialName: string) => {
    setEditCourseMode(id);
    setCourseName(initialName);
  };

  const handleEditClass = (id: string, initialName: string) => {
    setEditClassMode(id);
    setClassName(initialName);
  };
  const handleDeleteClass = async (id: any, type: string) => {
    try {
      const res = await axios.delete(`${url}/api/${type}/${id}`);
      setLoading(true);
      toast.success(res.data.message);
      router.refresh();
      deleteClassModal.closeModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleDeleteCourse = async (id: string, type: string) => {
    try {
      const res = await axios.delete(`${url}/api/course/${id}`);
      setLoading(true);
      toast.success(res.data.message);
      router.refresh();
      deleteCourseModal.closeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      deleteCourseModal.closeModal();
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

  const handleUpdateCourse = async (
    id: string,
    e: React.FormEvent<EventTarget>
    // initialName: string
  ) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${url}/api/course/${id}`, {
        name: courseName,
      });
      toast.success(res.data.message);
      setEditClassMode(null);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setEditCourseMode(" ");
    }
    // setCourseName(initialName);
  };

  const addChapter = (id: string) => {
    // alert(id);
    setChapterValue(id);
    chapterModal.openModal();
  };

  const handleEditChapter = (id: string, name: string) => {
    setEditChapterMode(id);
    setChapterName(name);
  };
  const handleDeleteChapter = async (id: string) => {
    try {
      const res = await axios.delete(`${url}/api/subject/${id}`);
      setLoading(true);
      toast.success(res.data.message);
      router.refresh();
      deleteChapterModal.closeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      deleteCourseModal.closeModal();
    }
  };

  const handleUpdateChapter = async (
    id: string,
    e: React.FormEvent<EventTarget>
  ) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${url}/api/subject/${id}`, {
        name: chapterName,
      });
      toast.success(res.data.message);
      setEditChapterMode(null);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setEditChapterMode(" ");
    }
  };

  return (
    <>
      <AddCourseModal
        header="Create Course"
        defaultValue={{ name: "" }}
        classId={courseValue}
      />
      <AddChapterModal
        header="Create Chapter"
        defaultValue={{ name: "" }}
        courseId={chapterValue}
      />
      {courseValue !== "" && (
        <DeleteCourseModal
          isLoading={loading}
          onConfirm={() => handleDeleteCourse(courseValue, courseName)}
          setIsLoading={setLoading}
          title="Are you sure absolutely sure ?"
          description="
          This action cannot be undone. This will permanently delete classes and course lists data from our servers."
        />
      )}

      {chapterValue !== "" && (
        <DeleteChapterModal
          isLoading={loading}
          onConfirm={() => handleDeleteChapter(chapterValue)}
          setIsLoading={setLoading}
          title="Are you sure absolutely sure ?"
          description="
          This action cannot be undone. This will permanently delete chapter from our server "
        />
      )}

      {classValue !== "" && (
        <DeleteClassModal
          isLoading={loading}
          onConfirm={() => handleDeleteClass(classValue, "class")}
          setIsLoading={setLoading}
          title="Are you sure absolutely sure ?"
          description="
          This action cannot be undone. This will permanently delete  course  data from our servers."
        />
      )}

      <AdminContainer>
        <div className="flex space-x-4 ">
          <div className="flex ml-4 flex-wrap lg:ml-[10rem]">
            <div className="mt-2 ml-4 mr-[0.7rem]">
              <AdminCourse />
            </div>
            {classes &&
              classes.map((item: ClassType) => (
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
                                    onChange={(e) =>
                                      setClassName(e.target.value)
                                    }
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
                                  deleteClassModal.openModal(),
                                    setClassValue(item.id);
                                }}
                              />
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div>
                            <div className="space-y-2 text-primary/80  ">
                              {((item as any).Course || []).map(
                                (course: CourseType) => (
                                  <div
                                    className="shadow-md cursor-pointer "
                                    key={course.id}
                                  >
                                    <Accordion type="single" collapsible>
                                      <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-[#EE7A79]">
                                          <div className="flex px-2 justify-between items-center w-full">
                                            {editCourseMode === course.id ? (
                                              <form
                                                action=""
                                                onSubmit={(
                                                  e: React.FormEvent<EventTarget>
                                                ) =>
                                                  handleUpdateCourse(
                                                    course.id,
                                                    e
                                                  )
                                                }
                                                className="mr-[10px]"
                                              >
                                                <Input
                                                  name="class"
                                                  value={courseName}
                                                  onChange={(e) =>
                                                    setCourseName(
                                                      e.target.value
                                                    )
                                                  }
                                                  className="h-[2.5rem]   "
                                                />
                                                {/* <button className="hidden">Submit</button> */}
                                              </form>
                                            ) : (
                                              <h2 className="text-[#EE7A79]">
                                                {course.name}
                                              </h2>
                                            )}
                                            <div className="flex space-x-2">
                                              <Pencil
                                                className="w-4 h-4"
                                                color="green"
                                                onClick={() =>
                                                  handleEditCourse(
                                                    course.id,
                                                    course.name
                                                  )
                                                }
                                              />
                                              <Trash
                                                className="w-4 h-4"
                                                color="red"
                                                onClick={() => {
                                                  deleteCourseModal.openModal(),
                                                    setCourseValue(course.id);
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          {((course as any).Subject || []).map(
                                            (chapter: any) => (
                                              <div
                                                className="flex justify-between items-center px-2 py-2"
                                                key={chapter.id}
                                              >
                                                <div className="text-[#EE7A79] list-decimal">
                                                  {/* <li> {chapter.name}</li> */}
                                                  {editChapterMode ===
                                                  chapter.id ? (
                                                    <form
                                                      action=""
                                                      onSubmit={(
                                                        e: React.FormEvent<EventTarget>
                                                      ) =>
                                                        handleUpdateChapter(
                                                          chapter.id,
                                                          e
                                                        )
                                                      }
                                                      className="mr-[10px]"
                                                    >
                                                      <Input
                                                        name="class"
                                                        value={chapterName}
                                                        onChange={(e) =>
                                                          setChapterName(
                                                            e.target.value
                                                          )
                                                        }
                                                        className="h-[2.5rem]   "
                                                      />
                                                      {/* <button className="hidden">Submit</button> */}
                                                    </form>
                                                  ) : (
                                                    <h2 className="text-[#EE7A79]">
                                                      {chapter.name}
                                                    </h2>
                                                  )}
                                                </div>
                                                <div className="flex space-x-2">
                                                  <Pencil
                                                    className="w-4 h-4"
                                                    color="green"
                                                    onClick={() =>
                                                      handleEditChapter(
                                                        chapter.id,
                                                        chapter.name
                                                      )
                                                    }
                                                  />
                                                  <Trash
                                                    className="w-4 h-4"
                                                    color="red"
                                                    onClick={() => {
                                                      deleteChapterModal.openModal();
                                                      setChapterValue(
                                                        chapter.id
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )
                                          )}
                                          <div
                                            className="flex items-center  text-white p-1 rounded-md shadow-md cursor-pointer mt-4 bg-[#EE7A79] "
                                            onClick={() =>
                                              addChapter(course.id)
                                            }
                                          >
                                            <PlusCircle className="w-4 h-4 mr-1" />
                                            Add Subject
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>
                                )
                              )}
                            </div>
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
