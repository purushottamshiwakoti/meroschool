"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullname: z.string().min(4, {
    message: "FullName must be at least 4 characters.",
  }),
  email: z.string().email(),
  suggestion: z.string().min(10, {
    message: "Suggestion must be at least 10 characters.",
  }),
});

const SuggestionForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      suggestion: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast.success("Scuccessfully submitted suggestion");
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flexflex-col lg:px-[22rem] mt-5 "
        >
          <div className="bg-white dark:bg-black/70 p-5 space-y-8 rounded-lg shadow-md  ">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary/60">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary/60">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suggestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary/60">Suggestion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We appreciate your suggestion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex mt-7 w-full justify-center items-center">
              <Button
                className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-60 "
                disabled={loading}
              >
                Submit Suggestion
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SuggestionForm;
