import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {searchKey,courseName,chapterName}=await req.json();
    const questions = await prismadb.question.findMany({
        where: {
          question: {
            contains: searchKey,
            mode: "insensitive",
          },
          subjects: {
            slug: courseName,
          },
          chapters: {
            slug: chapterName,
          },
        },
      });

      return NextResponse.json({message:"Successfully searched question",questions})
}