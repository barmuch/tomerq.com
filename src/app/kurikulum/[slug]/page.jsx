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
                const res = await fetch(`http://localhost:3000/api/kurikulums/${slug}`);
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
        <div className="">
            <div className="bg-primary1 text-primary2">
                <Navbar />
            </div>
            <div className='bg-primary2 w-full h-screen flex flex-col items-center py-6 gap-4'>
                <div className='text-4xl font-semibold text-black'>{data?.title}</div>
                <div className='text-2xl px-3 text-black text-justify leading-tight indent-8 w-4/5'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
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
                                                <Link href= {`/kurikulum/${data?.slug}/${materiFiltered.id}/pembahasan`} className='bg-black justify-items-start text-xl pl-3' key={materiFiltered.title}>
                                                    - {materiFiltered.title}
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
    );
}

export default Materi;