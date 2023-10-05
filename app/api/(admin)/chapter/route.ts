import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
try {
  const chapter = await prismadb.chapter.findMany({
    include: {
      courses: true,
      subjects: true,
      class: true,
    },
  });
  return NextResponse.json({message: "Successfully added chapter",chapter},{status:200});
  
  
} catch (error) {
  return NextResponse.json({error: error},{status:500});
  
}
}

export async function POST(req: NextRequest) {
    // const { userId } = getAuth(req);
    // if(!userId) return NextResponse.json({message:"Unauthenticated"},{status:403});
   try {
    const body=await req.json();
    const {classId,courseId,subjectId,name}=body;
  
    const addChapter = await prismadb.chapter.create({
      data: { 
        name:name,
      slug:name.replace(/\s/g, '-').toLowerCase(),
     classId:classId,
     courseId:courseId,
     subjectId:subjectId,
       },
    });
    return NextResponse.json({message: "Successfully added chapter",addChapter},{status:200});
  
    
   } catch (error) {
    console.log(error);
    return NextResponse.json({error: error},{status:500});
    
   }
  }