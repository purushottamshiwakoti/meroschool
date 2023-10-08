// import prismadb from "@/lib/prismadb";
// import { NextRequest,NextResponse } from "next/server";
// import * as  bcrypt from "bcrypt"

import { NextResponse } from "next/server";

// import { signJwtAccessToken } from "@/lib/jwt";


// export async function POST(req:NextRequest){
//     const body=await req.json();
//   const {email,password}=body;
//     const user=await prismadb.user.findFirst({
//         where:{
//             email:body.email,
//         },
       
//     });
//     if(!user){
//         return NextResponse.json({message:"Invalid Crediantials"},{status:401});

//     }

//    const comparePassword=await bcrypt.compare(password,user.password);
//    console.log(comparePassword);

//    if(comparePassword){
//     const accessToken=signJwtAccessToken(user)
//     return NextResponse.json({message:"Successfully logged in ",user,accessToken},{status:200});

//    }


// }

export async function GET(){
    return NextResponse.json({success:true},{status:200});
}