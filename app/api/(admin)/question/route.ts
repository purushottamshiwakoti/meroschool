import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:any}) {
//   const classId="651f98e5cea375f9cff56893"
//     const courseId="651f98f0cea375f9cff56894"
//     const subjectId="651f98fbcea375f9cff56895"
//     const chapterId="651f9969cea375f9cff5689a"


//   const newQuestion = await prismadb.question.createMany({
  

//     data: [
//       {
//         question:"Write about the cash basis of accounting?",
//         answer:"Cash basis accounting is a straightforward way of keeping track of a business's finances. In this method, transactions are recorded when actual cash goes in or out of the business. When the business receives money, that's when income is recorded, and when it pays money, that's when expenses are recorded. It's like keeping a ledger that mirrors your actual cash movements.",
//        chapterId:chapterId,
//        classId:classId,
//        subjectId:subjectId,
//        courseId:courseId,
       
//       },
//       {
//         question:"What are the importance of internal control to a business?",
//         answer:`Internal controls are like safety measures for businesses. They are important because they:

//         Protect Assets: Keep a business's stuff safe from theft or misuse.
//         Prevent Fraud: Stop dishonest actions within the company.
//         Ensure Accuracy: Make sure the money records are correct.
//         Follow Rules: Help the business obey laws and rules.
//         Work Efficiently: Keep things running smoothly.`,
//        chapterId:chapterId,
//        classId:classId,
//        subjectId:subjectId,
//        courseId:courseId,
       
//       },
//       {
//         question:"Write down the meaning of contingent liabilities?",
//         answer:"Contingent liabilities are possible debts that depend on something else happening. They include things like lawsuits and product warranties. If we can guess how much they might cost and if they're likely to happen, we put them on the financial statements.",
//        chapterId:chapterId,
//        classId:classId,
//        subjectId:subjectId,
//        courseId:courseId,
       
//       },
//       {
//         question:"What is long-lived assets?",
//         answer:"Long-lived assets are things a business owns that are super useful for a long time. Think of them as long-term investments for the business. These include stuff like land, buildings, machines, and furniture that are expected to be helpful for more than a year.",
//        chapterId:chapterId,
//        classId:classId,
//        subjectId:subjectId,
//        courseId:courseId,
       
//       },
//     ]
//   });

// return NextResponse.json({message: "Successfully added chapter",newQuestion},{status:200});



// console.log(body,param);
try{
const questions = await prismadb.question.findMany({
  include: {
    subjects: {
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
    chapters: {
      select: {
        name: true,
      },
    },
  },
  // orderBy:{
  //   created_at:"desc"
  // }
});

    return NextResponse.json(
      { message: "Successfully fetched question", questions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const { courseId, classId, chapterId,subjectId, question, answer } = await req.json();

    // console.log(courseId, classId, chapterId, question, answer);

    // Create a new question in the database using Prisma
    const newQuestion = await prismadb.question.create({
      data: {
        question,
        answer,
        classes: { connect: { id: classId } },
        courses: { connect: { id: courseId } },
        subjects: { connect: { id: subjectId } },
        chapters: { connect: { id: chapterId } },
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
