import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.content || !body.postId || !body.authorId) {
      return NextResponse.json({ error: 'Content, postId, and authorId are required' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content: body.content,
        post: {
          connect: { id: body.postId },
        },
        author: {
          connect: { id: body.authorId },
        },
        parentComment: body.parentCommentId ? {
          connect: { id: body.parentCommentId },
        } : undefined,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          }
        }
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
