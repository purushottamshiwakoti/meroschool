import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:any}) {


// console.log(body,param);
  try {
    const classDetail = await prismadb.class.findMany({
      include: {
        Course: {
          include: {
            Subject: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Successfully fetched class details", classDetail },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const { courseId, classId, chapterId, question, answer } = await req.json();

    // console.log(courseId, classId, chapterId, question, answer);

    // Create a new question in the database using Prisma
    const newQuestion = await prismadb.question.create({
      data: {
        question,
        answer,
        classes: { connect: { id: classId } },
        courses: { connect: { id: courseId } },
        subjects: { connect: { id: chapterId } },
      },
    });

    // console.log(newQuestion);

    return NextResponse.json(
      { message: "Successfully created question", newQuestion },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
