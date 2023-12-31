import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any,params:any) {
    try {
        const id=await params.params.id;
        const findCourse=await prismadb.subject.findUnique({
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
      const findChapter = await prismadb.subject.findFirst({
          where: {
              id
          }
      });

      if (!findChapter) {
          return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
      }

      // Now that we've confirmed the course exists, update it
      const updateChapter = await prismadb.subject.update({
          where: {
              id
          },
          data: {
              name
          },
      });

      return NextResponse.json({ message: "Successfully updated chapter" }, { status: 200 });

  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: any,params:any) {
  try {
    const id=await params.params.id;
   
      await prismadb.subject.delete({
          where:{
              id
          }
      });

return NextResponse.json({message: "Successfully deleted chapter",},{status:200});
      
  } catch (error) {
return NextResponse.json({error: error},{status:500});
      
  }

}

