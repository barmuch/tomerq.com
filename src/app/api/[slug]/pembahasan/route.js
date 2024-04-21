import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE Kurikulum
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const kurikulum = await prisma.pembahasan.findUnique({
      where: {
        materiId : slug
      }
    });

    return new NextResponse(JSON.stringify(kurikulum, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};