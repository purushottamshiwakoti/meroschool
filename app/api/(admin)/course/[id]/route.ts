import { Method } from './../../../../../node_modules/axios/index.d';
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any,params:any) {
    try {
        const id=await params.params.id;
        console.log(id);
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
      console.log({id});
      const { name } = await req.json();
      console.log({name});

      // Check if the course exists before updating
      const findCourse = await prismadb.course.findUnique({
          where: {
              id
          }
      });

      if (!findCourse) {
          return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
      console.log(findCourse);

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
    console.log(id);
   
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

