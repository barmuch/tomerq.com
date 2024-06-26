import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { 
        id: slug 
      },
      include: { 
        comments: {
          include: {
            author: true,  // Include the author information for comments
            replies: {
              include: {
                author: true  // Include the author information for replies
              }
            }
          }
        }
      }
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
