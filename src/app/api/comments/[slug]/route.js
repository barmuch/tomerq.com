import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req, { params }) => {
    const { slug } = params;
  
    try {
      const comments = await prisma.comment.findMany({
        where: { 
        postId : slug 
      }, include : {
        author : true
      }
      });
  
      return new NextResponse(JSON.stringify(comments, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };

// DELETE COMMENT
export const DELETE = async (req, { params }) => {
  const { id } = params; // assuming the comment id is passed as a parameter

  try {
    const commentId = parseInt(id);

    if (isNaN(commentId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid comment ID" }), { status: 400 });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) { 
      return new NextResponse(JSON.stringify({ message: "Comment not found" }), { status: 404 });
    }


    // Delete the comment and its replies  
    await prisma.comment.deleteMany({
      where: {
        OR: [
          { id: commentId },
          { parentCommentId: commentId },
        ],
      },
    });

    return new NextResponse(JSON.stringify({ message: "Comment deleted" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
