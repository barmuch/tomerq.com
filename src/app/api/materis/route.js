import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const kurikulums = await prisma.materi.findMany()

        return new NextResponse(JSON.stringify(kurikulums, { status : 500}))
    } catch (err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}, {status: 500})
        )
    }

}