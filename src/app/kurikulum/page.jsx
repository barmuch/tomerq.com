"use client"
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Loading from "@/components/loading/page";
const Kurikulum = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://tomerq-com-git-main-barmuchs-projects.vercel.app/api/kurikulums`);
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
        <div>
            {/* Navbar */}
            <div className="w-full bg-primary1 text-primary2"><Navbar/></div>
            {/* content */}
            <div className="max-w-full bg-primary1 py-5 border-t-2 border-primary2">
                {/* container putih*/}
                <div className="flex flex-col gap-4 py-5  w-11/12 bg-primary2 h-11/12 mx-auto rounded-lg px-4">
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
                    <div className=" text-xl lg:text-3xl text-black justify-start font-bold w-11/12 lg:w-3/5  mx-auto">Kurikulum</div>
                    {/* Mapping data kurikulum */}
                    {data.map((kurikulum) => (
                        <Link href={`/kurikulum/${kurikulum.slug}`} key={kurikulum.slug} className="flex flex-row bg-primary2 text-black w-max-full p-2 rounded-lg mx-auto w-11/12 lg:w-3/5 hover:bg-hover1 cursor-pointer border-2 border-black">
                            {kurikulum.title}
                        </Link>   
                    ))}
                </div>  
            </div>
        </div>
    );
}

export default Kurikulum;
