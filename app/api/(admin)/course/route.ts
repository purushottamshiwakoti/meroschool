import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any) {

  return NextResponse.json({ message: "This is course page" }, { status: 200 });
}
export async function POST(req: any,params:any) {
  // const { userId } = getAuth(req);
  // if(!userId) return NextResponse.json({message:"Unauthenticated"},{status:403});
  
  // const id=await params.params.id;
  // console.log(id);
 try {
   const {classId,values}=await req.json();
 
  const addCourse = await prismadb.course.create({
    data: {
      name:values.name,
      class:{connect:{id:classId}}
    }
      

  });
  return NextResponse.json({message: "Successfully added course",addCourse},{status:200});

  
 } catch (error) {
  console.log(error);
  return NextResponse.json({error: error},{status:500});
  
 }
}
