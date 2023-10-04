"use client";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import {toast} from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useAdminCourseModalStore from "@/hooks/useAdminCourseModalStore ";
import useAdminChapterModalStore from "@/hooks/useAdminChapterModalStore ";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "CourseName must be at least 2 characters.",
  }),
});
interface AddClassModalProps {
  defaultValue: {
    name: string;
  };
  header: string;
  courseId: string;
}
const AddChapterModal: React.FC<AddClassModalProps> = ({
  defaultValue,
  header,
  courseId,
}) => {
  const adminModal = useAdminChapterModalStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });
  const url = typeof window !== "undefined" ? window.location.origin : "";

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/subject`, { values, courseId });
      toast.success(res.data.message);
      form.reset();
      adminModal.isOpen = false;
      router.refresh();
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
            <DialogTitle>{header}</DialogTitle>
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
                        <FormLabel>Chapter Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter chapter name here"
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
                        Saving Changes
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80"
                      >
                        Save Changes
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

export default AddChapterModal;
