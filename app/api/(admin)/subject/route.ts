import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: any) {

 try{
    const getAllChapters=await prismadb.subject.findMany(
    
     
    )

    return NextResponse.json({ message: "This is chapter page",getAllChapters }, { status: 200 });
 }catch(error){
    return NextResponse.json({ error: error }, { status: 500 });
 }
}
export async function POST(req: any,params:any) {
  // const { userId } = getAuth(req);
  // if(!userId) return NextResponse.json({message:"Unauthenticated"},{status:403});
  
  // const id=await params.params.id;
  // console.log(id);
 try {
   const {courseId,values}=await req.json();
 
  const addChapter = await prismadb.subject.create({
    data: {
      name:values.name,
      slug:values.name.replace(/\s/g, '-').toLowerCase(),
      courses:{connect:{id:courseId}}
    }
      

  });
  return NextResponse.json({message: "Successfully added subject",addChapter},{status:200});

  
 } catch (error) {
  console.log(error);
  return NextResponse.json({error: error},{status:500});
  
 }
}
