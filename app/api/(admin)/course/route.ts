// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import prismadb from "@/lib/prismadb";

// export async function GET(req: any) {

//   return NextResponse.json({ message: "yo course page ho hai" }, { status: 200 });
// }
// export async function POST(req: any) {
//   // const { userId } = getAuth(req);
//   // if(!userId) return NextResponse.json({message:"Unauthenticated"},{status:403});
//  try {
//   const body=await req.json();

//   const addClass = await prismadb.course.create{
//     data:{
//       name:"BBS 1st Year",
//       courseId:"65144fa8696b94bc5733aa3a"
//     }
//   }
//   return NextResponse.json({message: "Successfully added class",addClass},{status:200});

  
//  } catch (error) {
//   console.log(error);
//   return NextResponse.json({error: error},{status:500});
  
//  }
// }
