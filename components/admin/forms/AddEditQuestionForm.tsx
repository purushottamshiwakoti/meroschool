"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import QuillBetterTable from "quill-better-table";

import { Chapter, Class, Course, Subject } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  classId: z.string().min(2, {
    message: "Class must be selected",
  }),
  courseId: z.string().min(2, {
    message: "Course must be selected",
  }),
  subjectId: z.string().min(2, {
    message: "Subject must be selected",
  }),
  chapterId: z.string().min(2, {
    message: "Chapter must be selected",
  }),
  question: z.string().min(5, {
    message: "Question must be at least 5 characters",
  }),
  answer: z.string().min(5, {
    message: "Answer must be at least 5 characters",
  }),
});

const ReactQuillNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
});
interface AddEditQuestionFormProps {
  classes: Class[];
  courses: Course[];
  subjects: Subject[];
  chapters: Chapter[];
}

const AddEditQuestionForm: React.FC<AddEditQuestionFormProps> = ({
  classes,
  courses,
  subjects,
  chapters,
}) => {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const router = useRouter();
  const [classValue, setClassValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [courseValue, setCourseValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: "",
      courseId: "",
      subjectId: "",
      question: "",
      answer: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/question`, values);
      // console.log(res);

      toast.success(res.data.message);
      form.resetField("answer");
      form.resetField("question");

      // router.refresh();
      // router.back();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full bg-white lg:p-10  p-2 rounded-md shadow-md"
        >
          <div className="lg:flex lg:space-x-5 block">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Class</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value), setClassValue(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((item) => (
                          <SelectItem
                            value={item.id}
                            key={item.id}
                            onChange={() => setClassValue(item.name)}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Course</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Update the form field value
                        setCourseValue(value); // Update the courseValue state
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {classValue ? (
                          courses.map(
                            (course) =>
                              course.courseId === classValue && (
                                // <div>dsnnds</div>
                                <SelectItem value={course.id} key={course.id}>
                                  {course.name}
                                </SelectItem>
                              )
                          )
                        ) : (
                          <p className="text-rose-600">
                            Please select class first
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Subject</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSubjectValue(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseValue ? (
                          subjects.map(
                            (subject) =>
                              subject.subjectId === courseValue && (
                                // <div>dsnnds</div>
                                <SelectItem value={subject.id} key={subject.id}>
                                  {subject.name}
                                </SelectItem>
                              )
                          )
                        ) : (
                          <p className="text-rose-600">
                            Please select course first
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chapterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Chapter</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectValue ? (
                          chapters.map(
                            (chapter) =>
                              chapter.subjectId === subjectValue && (
                                <SelectItem value={chapter.id} key={chapter.id}>
                                  {chapter.name}
                                </SelectItem>
                              )
                          )
                        ) : (
                          <p className="text-rose-600">
                            Please select a subject first
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <ReactQuillNoSSR
                    theme="snow"
                    {...field}
                    modules={modules}
                    formats={formats}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>

                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} />; */}
                  <ReactQuillNoSSR
                    theme="snow"
                    {...field}
                    modules={modules}
                    formats={formats}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <Button
              className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full lg:w-full/2"
              disabled
            >
              <Loader className="animate-spin h-5 w-5 mr-3" />
              Adding Question
            </Button>
          ) : (
            <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full lg:w-full/2">
              Add Question
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default AddEditQuestionForm;
