"use client";

import React from "react";
import AdminContainer from "../components/AdminContainer";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import useAdminModalStore from "@/hooks/useAdminModalStore";
import AddClassModal from "../modals/AddClassModal";

const AdminCourse = () => {
  const adminModal = useAdminModalStore();
  const addClass = () => {
    adminModal.openModal();
  };

  return (
    <>
      <AddClassModal />
      <AdminContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {/* Add Class  */}
          <div
            className="w-56 p-4 h-64 shadow-md rounded-md border-dashed border-2 border-[#EE7A79] flex items-center justify-center cursor-pointer"
            onClick={addClass}
          >
            <div className="flex items-center text-primary/60">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Class
            </div>
          </div>
        </div>
        <div></div>
      </AdminContainer>
    </>
  );
};

export default AdminCourse;
