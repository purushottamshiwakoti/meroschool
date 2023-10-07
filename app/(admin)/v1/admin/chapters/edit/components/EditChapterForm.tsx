"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Class, Course, Subject } from "@prisma/client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  classId: z.string().min(2, {
    message: "Class must be at least 2 characters.",
  }),
  courseId: z.string().min(2, {
    message: "Course must be at least 2 characters.",
  }),
  subjectId: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Chapter must be at least 2 characters.",
  }),
});

interface EditChapterFormProps {
  classList: Class[];
  courseList: Course[];
  subjectList: Subject[];
  defaultValues: any;
}

const EditChapterForm: React.FC<EditChapterFormProps> = ({
  classList,
  courseList,
  subjectList,
  defaultValues,
}) => {
  const [classValue, setClassValue] = useState(defaultValues.classId);
  const [courseValue, setCourseValue] = useState(defaultValues.courseId);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const url = typeof window !== "undefined" ? window.location.origin : "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.patch(`${url}/api/chapter/${params.id}`, values);
      toast.success(res.data.message);
      form.reset();
      router.refresh();
      router.push("/v1/admin/chapters");
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
          className="space-y-8 bg-white p-5 rounded-md shadow-md"
        >
          <div className="lg:flex items-center lg:space-x-10  space-y-5 lg:space-y-0">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Class</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}

                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value), setClassValue(value);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classList.map((item) => (
                          <div key={item.id}>
                            <SelectItem value={item.id}>{item.name}</SelectItem>
                          </div>
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
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value), setCourseValue(value);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {classValue ? (
                          courseList.map(
                            (course) =>
                              course.courseId === classValue && (
                                <div key={course.id}>
                                  <SelectItem value={course.id}>
                                    {course.name}
                                  </SelectItem>
                                </div>
                              )
                          )
                        ) : (
                          <p className="text-rose-500">
                            Please select class name first
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
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseValue ? (
                          subjectList.map(
                            (subject) =>
                              subject.subjectId === courseValue && (
                                <div key={subject.id}>
                                  <SelectItem value={subject.id}>
                                    {subject.name}
                                  </SelectItem>
                                </div>
                              )
                          )
                        ) : (
                          <p className="text-rose-500">
                            Please select course name first
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter chapter name"
                    {...field}
                    className="lg:w-[40rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex ">
            {loading ? (
              <Button
                className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full lg:w-1/3"
                disabled
              >
                <Loader className="animate-spin h-5 w-5 mr-3" />
                Updating Chapter
              </Button>
            ) : (
              <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full lg:w-1/3">
                Update Chapter
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditChapterForm;
