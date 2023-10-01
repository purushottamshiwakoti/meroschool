import { Method } from './../../../../../node_modules/axios/index.d';
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any,params:any) {
    try {
        const id=await params.params.id;
        const findCourse=await prismadb.course.findUnique({
            where:{
                id
            }
        });
        if(!findCourse) return  NextResponse.json({message: "No class found"},{status:500});
  return NextResponse.json({message: "sasja",class:findCourse},{status:200});
        
    } catch (error) {
  return NextResponse.json({error: "sansnanb"},{status:500});
        
    }

}

export async function PATCH(req: any, params: any) {
  try {
      const id = await params.params.id;
      const { name } = await req.json();

      // Check if the course exists before updating
      const findCourse = await prismadb.course.findUnique({
          where: {
              id
          }
      });

      if (!findCourse) {
          return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }

      // Now that we've confirmed the course exists, update it
      const updateCourse = await prismadb.course.update({
          where: {
              id
          },
          data: {
              name
          },
      });

      return NextResponse.json({ message: "Successfully updated course" }, { status: 200 });

  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: any,params:any) {
  try {
    const id=await params.params.id;
   
      await prismadb.course.delete({
          where:{
              id
          }
      });

return NextResponse.json({message: "Successfully deleted course",},{status:200});
      
  } catch (error) {
return NextResponse.json({error: "sansnanb"},{status:500});
      
  }

}

