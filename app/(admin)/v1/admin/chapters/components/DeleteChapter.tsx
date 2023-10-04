"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAdminChapterModalStore from "@/hooks/useAdminChapterModalStore ";
import { DialogClose } from "@radix-ui/react-dialog";

const DeleteChapter = () => {
  const useModalStore = useAdminChapterModalStore();
  return (
    <>
      <Dialog
        open={useModalStore.isOpen}
        onOpenChange={useModalStore.closeModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete chapter
              and remove chapter data from our servers.
            </DialogDescription>
            <DialogFooter>
              <div className="space-x-5">
                <Button> Delete</Button>
                <DialogClose>
                  <Button variant={"outline"}> Cancel</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteChapter;
