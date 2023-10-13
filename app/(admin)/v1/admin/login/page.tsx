"use client";

import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      setLoading(true);
      const { email, password } = values;
      console.log(email, password);
      const res = await fetch(`https://bbstutorial.com/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.status !== 200) {
        toast.success(result.message);
        router.push("/v1/admin/dashboard");
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center flex-col w-full px-6 py-12 lg:px-8">
        <div className="bg-white px-10 py-5 shadow-md rounded-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#EE7A79] ">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div>
                  <div className="mt-2">
                    {/* <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary/80">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter email here"
                              {...field}
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div> */}
                  {/* <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div> */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary/80">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter password here"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {loading ? (
                    <Button
                      className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 w-full"
                      disabled
                    >
                      <Loader className="animate-spin h-5 w-5 mr-3 " />
                      Validating User
                    </Button>
                  ) : (
                    <Button className="w-full" type="submit">
                      Signin
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
