"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"
import Loading from "@/components/loading/page"
import Image from "next/image"
const Pembahasan = ({params}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)    
    const { materiId } = {...params}

    useEffect(() => {
        const getData = async(materiId) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${materiId}/pembahasan`)
                if (!res.ok) {
                    throw new Error("Failed")
                } else {
                    const data = await res.json()
                    setData(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getData(materiId)
    },[materiId])
    
    if (loading) {
        return <Loading/>
    }
    
return (
    <div className=" flex flex-col h-screen">
        {/* navbar */}
        <div className="md:h-12 bg-primary1 text-primary2"><Navbar/></div>
        {/* content */}
        <div className="max-w-full bg-primary1 py-5 border-t-2 border-primary2 flex lg:flex-1 lg:overflow-hidden flex-col gap-4 lg:flex-row lg:px-4 ">
            {/* teori dan contoh */}
            <div className="flex flex-col gap-4 w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto">
                {/* Teori */}
                <div className=" flex flex-col border-b-2 border-black p-4">
                    <div className="items-start font-bold "> {data?.materiTitle}</div>
                    <div className=" text-justify indent-6" ><div dangerouslySetInnerHTML={{ __html: data?.teori }} /></div>
                </div>
                {/* contoh */}
                <div className="h-1/3">
                    <div className="items-start font-bold border-black">contoh</div>
                    <Image src="/kata-jamak.png" alt="" 
                    width={400} height={500} className="lg:px-20" quality={100}
                    />
                </div>
            </div>
            {/* latihan */}
            <div className="flex flex-col gap-4 py-5 w-11/12 bg-primary2 h-11/12 mx-auto rounded-lg px-4 items-start grid lg:w-2/5">
                {/* title */}
                <div className="font-bold justify">Latihan</div>
                {/* perintah latihan */}
                <div className="text-justify indent-6">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, officia repellendus possimus numquam impedit labore culpa, cupiditate facilis ut error delectus, sed aliquid dignissimos! Omnis.
                </div>
                {/* soal Latihan */}
                <div className="flex flex-row justify-between">
                    <div className="items-center p-2">Lorem, ipsum.    <input className="border border-black rounded-md focus:outline-none focus:border-blue-500" type="text" style={{ width: "75px" }}/>
                    </div>

                    <div className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-hover2  cursor-pointer">cek</div>
                </div>
                {/* button latihan */}
                <div className="justify-self-end flex flex-row gap-2">
                    <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold">Tanya Forum</button>
                    <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-primary2 hover:text-primary1 w-1/2  ">lanjut</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pembahasan