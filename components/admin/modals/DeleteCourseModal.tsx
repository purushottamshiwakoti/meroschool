"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAdminDeleteCourseModalStore from "@/hooks/useAdminDeleteCourseModalStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useEffect } from "react";

interface DeleteModalProps {
  isLoading: boolean;
  onConfirm: any;
  setIsLoading: any;
  title: string;
  description: string;
}
const DeleteCourseModal: React.FC<DeleteModalProps> = ({
  setIsLoading,
  isLoading,
  onConfirm,
  title,
  description,
}) => {
  const deleteModal = useAdminDeleteCourseModalStore();

  useEffect(() => {
    if (!deleteModal.isOpen) {
      setIsLoading(false);
    }
  }, [deleteModal.isOpen, setIsLoading]);

  return (
    <Dialog open={deleteModal.isOpen} onOpenChange={deleteModal.closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-between items-center space-x-6">
            {isLoading ? (
              <Button
                type="submit"
                className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80 "
                disabled
              >
                <Loader className="animate-spin h-5 w-5 mr-3" />
                Deleting
              </Button>
            ) : (
              <div onClick={() => setIsLoading(!isLoading)}>
                <Button
                  type="submit"
                  className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80"
                  onClick={() => onConfirm()}
                >
                  Delete
                </Button>
              </div>
            )}
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourseModal;
