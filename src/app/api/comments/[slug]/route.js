import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: slug,
      },
      include: {
        author: true,
      },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE COMMENT
export const DELETE = async (req, { params }) => {
  const { commentId } = params; 

  try {
    await prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        parentComment: {
          disconnect: true,
        },
      },
    });

    // Kembalikan respon sukses
    const response = new NextResponse(
      JSON.stringify({ message: "Comment deleted" }),
      { status: 200 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    console.error("Error deleting comment:", err);
    const response = new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
};
