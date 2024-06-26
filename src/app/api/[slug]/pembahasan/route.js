import prisma from "@/lib/utils/connect";
import { NextResponse } from "next/server";


// GET SINGLE Kurikulum
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const kurikulum = await prisma.pembahasan.findUnique({
      where: {
        materiId : slug
      }, include : {
        latihan : {
          include : {
            item : true
          }
        },
        contoh : {
          include : {
            item : true
          }
        },
        catatan : {
          include : {
            item : true
          }
        },
        kosakata : {
          include : {
            item : true
          }
        },
        tips : true
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