import { NextResponse } from 'next/server';
import prisma from "@/lib/utils/connect"; // Adjust the import path as necessary

// Handle GET request
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// Handle POST request
export async function POST(request) {
    try {
        const body = await request.json();
        const newPost = await prisma.post.create({
            data: {
                content: body.content,
                author: {
                    connect: { id: body.authorId }, // Assuming the request body contains an authorId
                },
            },
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
