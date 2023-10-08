import prismadb from "@/lib/prismadb";

const baseUrl=process.env.NEXT_URL;


export default async function sitemap(){
    const getCourse=await prismadb.course.findMany({

    });
    const courseUrls=getCourse.map((item)=>(
      {
        url:`${baseUrl}/view-classes/${item.slug}`,
        lastModified:item.updated_at,
      }
    ));
      const  getSubject=await prismadb.subject.findMany({
        select:{
            slug:true,
            updated_at:true,
            courses:{
                select:{
                    slug:true,
                }
            }
        }
      });
      const subjectUrls=getSubject.map((item)=>(
        {
          url:`${baseUrl}/view-classes/${item.courses.slug}/${item.slug}`,
          lastModified:item.updated_at,
        }
      ));

    
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
            url:`${baseUrl}/view-classes`,
            lastModified:new Date(),
        },
        ...courseUrls,
        ...subjectUrls
    ]
}