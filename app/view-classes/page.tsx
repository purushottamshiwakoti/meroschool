import prismadb from "@/lib/prismadb";
import React from "react";

import { Metadata } from "next";
import CLassList from "@/components/user/class/ClassList";

export const metadata: Metadata = {
  title: "View Class",
  description:
    "Discover BBS 1st Year, BBS 2nd Year, BBS 3rd Year and BBS 4th Year class lists here.View all questions and answers of all classes here!!",
  alternates: {
    // canonical: "/view-classes",
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
