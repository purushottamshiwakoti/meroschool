"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

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

interface ViewChapterFormProps {
  defaultValues: any;
}

const ViewChapterForm: React.FC<ViewChapterFormProps> = ({ defaultValues }) => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.

  return (
    <>
      <Form {...form}>
        <form className="space-y-8 bg-white p-5 rounded-md shadow-md">
          <div className="lg:flex items-center lg:space-x-10  space-y-5 lg:space-y-0">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Class</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} disabled />
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
                    <Input placeholder="shadcn" {...field} disabled />
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
                    <Input placeholder="shadcn" {...field} disabled />
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
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex ">
            <Button
              className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full lg:w-1/3"
              disabled
            >
              Viewing Chapter
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ViewChapterForm;
