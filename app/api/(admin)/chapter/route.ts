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
    orderBy:{
      created_at:"desc"
    }
  });
  return NextResponse.json({message: "Successfully fetched chapter",chapter},{status:200});
  
  
} catch (error) {
  return NextResponse.json({error: error},{status:500});
  
}
// const classId="651f98e5cea375f9cff56893"
// const courseId="651f98f0cea375f9cff56894"
// const subjectId="651f98fbcea375f9cff56895"
// const addChapter = await prismadb.chapter.createMany({
//   data:[
//     { name:"Conceptual Framework Accounting", 
//           slug:"Conceptual Framework Accounting".replace(/\s/g, '-').toLowerCase(),
//          classId:classId,
//          courseId:courseId,
//          subjectId:subjectId,
//            },
  
  
 
   
    
   
   
     
//   ]
// });
// return NextResponse.json({message: "Successfully added chapter",addChapter},{status:200});



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