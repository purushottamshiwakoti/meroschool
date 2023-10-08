import { Chapter } from './(admin)/v1/admin/chapters/create/components/ChapterColumns';
import { Course } from '@prisma/client';
import prismadb from "@/lib/prismadb";

const baseUrl=process.env.NEXT_URL;


export default async function sitemap(){
    const getCourse=await prismadb.course.findMany({
        include:{
Subject:true,
        }
    });
    const courseUrls=getCourse.map((item)=>(
      {
        url:`${baseUrl}/class/${item.slug}`,
        lastModified:item.updated_at,
      }
    ));

    const subjectUrl=getCourse.map((subject)=>(
            subject.Subject.map((item)=>(
                {
                    url:`${baseUrl}/class/${subject.slug}/${item.slug}`,
                    lastModified:item.updated_at,
                }
            ))
    ))

    


    
    return [
        {
            url:baseUrl,
            lastModified:new Date(),
        },
        {
            url:`${baseUrl}/suggestion`,
            lastModified:new Date(),
        },
        {
            url:`${baseUrl}/class`,
            lastModified:new Date(),
        },
        ...courseUrls,
        ...subjectUrl
    ]
}