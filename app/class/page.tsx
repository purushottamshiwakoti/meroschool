import CLassList from "@/components/user/class/ClassList";
import prismadb from "@/lib/prismadb";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class",
  description:
    "Discover BBS Class Page: Your Resource Hub for Bachelors in Business Studies. Navigate structured classes, access study materials, and optimize exam prep",
  alternates: {
    canonical: "/class",
    languages: {
      "en-US": "/en-US",
    },
  },
};
async function getClasses() {
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/class`, {
      // next: { revalidate: 10 },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

const Class = async () => {
  const getClass = await getClasses();
  const allCLasses = await getClass.classes;
  // const allCLasses = await prismadb.class.findMany({
  //   include: {
  //     Course: true,
  //   },
  // });
  return (
    <>
      <div className="mt-[7rem]">
        {allCLasses && <CLassList classes={allCLasses} />}
      </div>
    </>
  );
};

export default Class;
