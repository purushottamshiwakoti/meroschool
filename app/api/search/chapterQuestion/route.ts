import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { chapterName,
        presentClass,
        courseName,
        searchKey}=await req.json();
    const questions = await prismadb.question.findMany({
        where: {
        courses:{
            slug: presentClass,
        },
       subjects:{
        slug:courseName,
       },
          chapters: {
            slug: chapterName,
          },
          question: {
            contains: searchKey,
            mode: "insensitive",
          },
        },
      });

      return NextResponse.json({message:"Successfully searched question",questions})
}