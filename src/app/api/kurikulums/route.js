import { NextResponse } from "next/server"
import prisma from "@/lib/utils/connect"
export const GET = async () => {
    try {
        const kurikulums = await prisma.kurikulum.findMany()
        return new NextResponse(JSON.stringify(kurikulums, { status : 500}))
    } catch (err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}, {status: 500})
        )
    }

}

export const POST = async (req) => {
    try {
      const body = await req.json();
      const { title } = body;
  
      if (!title) {
        return new NextResponse(JSON.stringify({ message: "Title is required!" }), { status: 400 });
      }
  
      const newKurikulum = await prisma.kurikulum.create({
        data: {
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-'), // Slugify the title
        },
      });
  
      return new NextResponse(JSON.stringify(newKurikulum), { status: 201 });
    } catch (error) {
      console.error("Error creating kurikulum:", error);
      return new NextResponse(JSON.stringify({ message: "Failed to create kurikulum" }), { status: 500 });
    }
  };