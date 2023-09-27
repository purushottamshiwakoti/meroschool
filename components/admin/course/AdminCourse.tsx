"use client";

import React from "react";
import AdminContainer from "../components/AdminContainer";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import useAdminModalStore from "@/hooks/useAdminModalStore";
import AddClassModal from "../modals/AddClassModal";
import CourseList from "./CourseList";

const AdminCourse = () => {
  const adminModal = useAdminModalStore();
  const addClass = () => {
    adminModal.openModal();
  };

  return (
    <>
      <AddClassModal header="Create Class" defaultValue={{ name: "" }} />
      <div className="">
        {/* Add Class  */}
        <div
          className="w-[10rem] p-4 h-32 shadow-md rounded-md border-dashed border-2 border-[#EE7A79] flex items-center justify-center cursor-pointer"
          onClick={addClass}
        >
          <div className="flex items-center text-primary/60">
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Class
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default AdminCourse;
