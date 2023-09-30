import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: any, params: any) {
  try {
    const id = await params.params.id;
    const findQuestion = await prismadb.question.findUnique({
      where: {
        id,
      },
      select: {
        question: true,
        answer: true,
        chapterId: true,
        classId: true,
        courseId: true,
        chapters: {
          select: {
            name: true,
          },
        },
        classes: {
          select: {
            name: true,
          },
        },
        courses: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!findQuestion)
      return NextResponse.json({ message: "No question" }, { status: 500 });

    return NextResponse.json(
      { message: "Successfully fetched question", question: findQuestion },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: any, { params }: { params: any }) {
  // console.log("dsmnmndsnmds");
  
  try {
    const id = await params.id;
    const { courseId, classId, chapterId, question, answer } = await req.json();

    // console.log(courseId, classId, chapterId, question, answer);

    // Create a new question in the database using Prisma
    const updatedQuestion = await prismadb.question.update({
      where:{
        id
      },
      data: {
        question,
        answer,
        classes: { connect: { id: classId } },
        courses: { connect: { id: courseId } },
        chapters: { connect: { id: chapterId } },
      },
    });



    return NextResponse.json({ message: "Successfully updated question",updatedQuestion }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });

    // console.log(error);
    
  }
}
