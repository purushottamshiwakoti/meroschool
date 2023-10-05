import AdminContainer from "@/components/admin/components/AdminContainer";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ChapterColumns } from "./create/components/ChapterColumns";
import DeleteChapter from "./components/DeleteChapter";

// const url = typeof window !== "undefined" ? window.location.origin : "";

async function getChapters() {
  const res = await fetch(`/api/chapter`, {
    next: {
      // revalidate: 1000,
    },
  });
  return res.json();
}

const page = async () => {
  // const chapter = await prismadb.chapter.findMany({
  //   include: {
  //     courses: true,
  //     subjects: true,
  //     class: true,
  //   },
  // });
  const chapter = await getChapters();

  const data = chapter.chapter.map((item: any) => ({
    id: item.id,
    class: item.class.name,
    subject: item.subjects.name,
    course: item.courses.name,
    chapter: item.name,
  }));

  return (
    <>
      <AdminContainer>
        <DeleteChapter />
        {/* <div className=" ml-4   lg:ml-[10rem]">This is course page</div> */}
        <div className=" ml-4  lg:ml-[10rem]">
          <div className="flex items-center justify-between">
            <h2 className="hidden lg:block text-2xl text-[#EE7A79] font-medium">
              Chapter List
            </h2>
            <Link href={"/v1/admin/chapters/create"}>
              <Button className="bg-[#EE7A79] hover:bg-[#EE7A79] hover:opacity-80">
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Chapter
              </Button>
            </Link>
          </div>
          <div className="max-w-screen overflow-x-auto">
            <DataTable
              columns={ChapterColumns}
              data={data}
              filterKey="chapter"
            />
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default page;
