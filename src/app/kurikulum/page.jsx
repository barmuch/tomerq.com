"use client"
import Navbar from "@/components/navbar"
import Link from "next/link";
import { useState, useEffect } from 'react';
import Loading from "@/components/loading/page";
const Kurikulum = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await res.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
   
    if (loading) {
        return <Loading/>
    }
    return (
        // container
        <div className=" h-screen flex flex-col">
            {/* Navbar */}
            <div className="md:h-12 bg-primary1 text-primary2"><Navbar/></div>
            {/* content */}
            <div className=" flex-1 flex max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden ">
                {/* container putih*/}
                <div className="flex flex-col gap-4 py-5  w-11/12 bg-primary2  mx-auto rounded-lg px-4 overflow-y-auto">
                    {/* Title */}
                    <div className="text-2xl text-black font-bold lg:text-4xl justify-center flex text-center">
                        Welcome to tomerQ.com
                    </div>
                    {/* quotes */}          
                    <div className="flex flex-col bg-primary2 text-black w-max-full p-2 rounded-lg w-11/12 lg:w-3/5 text-justify indent-4 gap-2 mx-auto justify-center lg:text-2xl">
                        <div>“Salah satu pengerdilan dalam hidup adalah membiarkan pikiran yang cemerlang menjadi budak bagi tubuh yang malas, yang mendahulukan istirahat sebelum lelah.”</div>
                        <div className="text-center">- H A M K A -</div>
                    </div>
                    {/* title  */}
                    <div className="text-xl lg:text-3xl text-black font-bold w-11/12 lg:w-3/5 mx-auto flex justify-between items-center">
                        <div>Kurikulum</div>
                        
                    </div>
                    {/* Mapping data kurikulum */}
                    {data?.map((kurikulum) => (
    <div key={kurikulum.slug} className="flex flex-row items-center justify-between bg-primary2 text-black p-4 rounded-lg mx-auto w-11/12 lg:w-3/5  cursor-pointer border-2 border-black">
        {/* Title */}
        <Link href={`/kurikulum/${kurikulum.slug}`} className="text-lg font-medium hover:bg-hover1">
            {kurikulum.title}
        </Link>
    </div>
))}

                </div>  
            </div>
        </div>
    );
}

export default Kurikulum;
