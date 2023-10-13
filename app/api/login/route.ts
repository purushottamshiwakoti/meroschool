import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import signJwt from "@/lib/signJwt";


export async function POST(req:NextRequest){
    const {email,password}=await req.json();
    console.log(email,password);
    const user=await prismadb.user.findFirst({
        where:{
            email,
        }
    });
    if(!user){
    return NextResponse.json({message:"Invalid Credentials"},{status:409});
    };
    const comparePasword=await bcrypt.compare(password,user.password);

    if(!comparePasword){
    return NextResponse.json({message:"Invalid Credentials "},{status:409});
    }
    const token=await signJwt({email});
   

    return NextResponse.json({message:"successfully Signed In",token},{status:200});
}