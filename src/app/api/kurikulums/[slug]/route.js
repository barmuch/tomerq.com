import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE Kurikulum
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const kurikulum = await prisma.kurikulum.findUnique({
      where: { slug },
      include: { materi: true },
    });

    if (!kurikulum) {
      return new NextResponse(
        JSON.stringify({ message: "Kurikulum not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(kurikulum), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// UPDATE Kurikulum
export const PUT = async (req, { params }) => {
  const { slug } = params;
  const { title } = await req.json();

  try {
    const updatedKurikulum = await prisma.kurikulum.update({
      where: { slug },
      data: { title },
    });

    return new NextResponse(JSON.stringify(updatedKurikulum), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update kurikulum" }),
      { status: 500 }
    );
  }
};

// DELETE Kurikulum
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    await prisma.kurikulum.delete({
      where: { slug },
    });

    return new NextResponse(
      JSON.stringify({ message: "Kurikulum deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete kurikulum" }),
      { status: 500 }
    );
  }
};
