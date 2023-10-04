import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any,params:any) {
    try {
        const id=await params.params.id;
        const findClass=await prismadb.class.findUnique({
            where:{
                id
            }
        });
        if(!findClass) return  NextResponse.json({message: "No class found"},{status:500});
  return NextResponse.json({message: "sasja",class:findClass},{status:200});
        
    } catch (error) {
  return NextResponse.json({error: "sansnanb"},{status:500});
        
    }

}

export async function PATCH(req: any,params:any) {
  try {
    const id=await params.params.id;
    const {name}=await req.json();
   
      const updateClass=await prismadb.class.update({
          where:{
              id
          },
          data: {
            name
          },
      });

return NextResponse.json({message: "Successfully updated class",},{status:200});
      
  } catch (error) {
return NextResponse.json({error: "sansnanb"},{status:500});
      
  }

}

export async function DELETE(req: any,params:any) {
  try {
    const id=await params.params.id;
   
      const deleteClass=await prismadb.class.delete({
          where:{
              id
          }
      });

return NextResponse.json({message: "Successfully deleted class",},{status:200});
      
  } catch (error) {
    console.log(error);
return NextResponse.json({error: "sansnanb"},{status:500});
      
  }

}

