import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import * as bcrypt from "bcrypt" ;
import { NextRequest } from 'next/server';
export async function POST(req:NextRequest){
    const {email,password,name}=await req.json();
    const findUser=await prismadb.user.findFirst({
        where:{
            email
        }
    });
    if(findUser){
        return NextResponse.json({message:"User already exists in our website"},{status:409})
    }

    const hashedPassword=await bcrypt.hash(password,12);

    const newUser=await prismadb.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    });
    return NextResponse.json({message:"User created successfully",newUser},{status:200})

}