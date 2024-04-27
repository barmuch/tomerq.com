"use client"
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/page"
import Link from "next/link"
const Materi = ({ params }) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [openBab, setOpenBab] = useState({});

    const { slug } = params;

    useEffect(() => {
        const getData = async (slug) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums/${slug}`);
                if (!res.ok) {
                    throw new Error("Failed");
                } else {
                    const data = await res.json();
                    setData(data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getData(slug);
    }, [slug]);

    const toggleBab = (bab) => {
        setOpenBab((prev) => ({
            ...prev,
            [bab]: !prev[bab],
        }));
    };

    if (loading) {
        return <Loading/>
    }
  console.log(params)
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <div className="md:h-12 bg-primary1 text-primary2">
                <Navbar />
            </div>
            {/* Content */}
            <div className='flex-1 flex overflow-hidden bg-primary2 w-full flex flex-col items-center '>
                <div className="flex flex-col w-11/12 md:w-4/5 items-center overflow-y-auto py-6 gap-4">    
                    <div className='text-4xl font-semibold text-black'>{data?.title}</div>
                    <div className='text-2xl px-3 text-black text-justify leading-tight indent-8 w-4/5'>{data?.quote}</div>
                    <div className='text-center text-2xl'>{data?.quoteFrom}</div>
                    {/* Materi */}
                    <div className='flex flex-col w-4/5 items-start gap-2 my-6'>
                        {data?.materi?.map((materi, index) => {
                            const isBabOpen = openBab[materi.bab];
                            const isFirstOccurrence = data.materi.findIndex(item => item.bab === materi.bab) === index;
                            return (
                                isFirstOccurrence && (
                                    <div key={materi.bab} className='flex flex-col gap-2 w-full'>
                                        {/* Bab */}
                                        <div className='bab text-2xl text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row gap-2 items-center cursor-pointer hover:bg-hover2' onClick={() => toggleBab(materi.bab)}>
                                            <div className='bab'>{materi.bab}</div>
                                        </div>
                                        {/* Materi List */}
                                        {isBabOpen && (
                                            <div className='item flex flex-col text-black'>
                                                {data?.materi?.filter(item => item.bab === materi.bab).map((materiFiltered) => (
                                                    <Link href= {`/kurikulum/${data?.slug}/${materiFiltered.id}/pembahasan`} className='font-sans bg-black justify-items-start text-xl pl-3 fo' key={materiFiltered.title}>
                                                        <span>&#9745;</span> {materiFiltered.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Materi;
