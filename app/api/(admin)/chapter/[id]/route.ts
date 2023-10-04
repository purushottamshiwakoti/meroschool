import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest,{params}:{params:any}) {
    const id=params.id;
    // const { userId } = getAuth(req);
    // if(!userId) return NextResponse.json({message:"Unauthenticated"},{status:403});
   try {
    const body=await req.json();
    const {classId,courseId,subjectId,name}=body;
  
    const updateChapter = await prismadb.chapter.update({
    where:{
        id
    },
    data: { 
        name:name,
      slug:name.replace(/\s/g, '-').toLowerCase(),
     classId:classId,
     courseId:courseId,
     subjectId:subjectId,
       },
    });
    return NextResponse.json({message: "Successfully updated chapter",updateChapter},{status:200});
  
    
   } catch (error) {
    console.log(error);
    return NextResponse.json({error: error},{status:500});
    
   }
  }