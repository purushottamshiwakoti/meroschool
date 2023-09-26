"use client";
import useAdminModalStore from "@/hooks/useAdminModalStore";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Classname must be at least 2 characters.",
  }),
});

const AddClassModal = () => {
  const adminModal = useAdminModalStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/class", values);
      toast.success(res.data.message);
      form.reset();
      adminModal.isOpen = false;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={adminModal.isOpen} onOpenChange={adminModal.closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Class</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 mt-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter class name here"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-x-3">
                    {loading ? (
                      <Button
                        type="submit"
                        className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 "
                        disabled
                      >
                        <Loader className="animate-spin h-5 w-5 mr-3" />
                        Submit
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddClassModal;
