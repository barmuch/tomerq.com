"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"
import Loading from "@/components/loading/page"
import Teori from "@/components/pembahasan/teori"
import Contoh from "@/components/pembahasan/contoh"
import Catatan from "@/components/pembahasan/catatan"
import Tips from "@/components/pembahasan/tips"
import Kosakata from "@/components/pembahasan/kosakata"
import Analisa from "@/components/pembahasan/analisa"
import AngkaConverter from "@/components/pembahasan/angkaConverter"
import JamConverter from "@/components/pembahasan/jamConverter"
import Latihan from "@/components/pembahasan/latihan"
import Navigation from "@/components/pembahasan/navigationPage"
const Pembahasan = ({params}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)    
    const { materiId } = {...params}
    
    useEffect(() => {
        const getData = async (materiId) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${materiId}/pembahasan`);
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

        getData(materiId);
    }, [materiId]);
    
    if (loading) {
        return <Loading/>
    } 
    
return (
    <div className=" flex flex-col h-screen">
        {/* navbar */}
        <div className="md:h-12 bg-primary1 text-primary2"><Navbar/></div>
        {/* content */}
        <div className="w-full bg-primary1 py-5 border-t-2 border-primary2 flex lg:flex-1 lg:overflow-hidden flex-col gap-4 lg:flex-row lg:px-4 ">
            {/* teori dan contoh */}
            <div className="flex flex-col gap-4 w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto overflow-x-hidden">
                {/* Teori */}
                <Teori data={data} /> 
                {/* contoh */}
                <Contoh data={data} />                 
                {/* catatan */}  
                <Catatan data={data} />
                {/* TIPS */}
                <Tips data={data} />
                {/* kosakata */}
                <Kosakata data={data} />                              
            </div>
            {/* latihan */}
            <div className="flex flex-col lg:text-2xl gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5 overflow-y-auto">
                {/* Analisa  */}
                <Analisa data={data} />                 
                {/* Angka Converter */}
                <AngkaConverter materiId={data?.materiId} />
                {/* converter */}
                <JamConverter materiId={data?.materiId} />
                {/* latihan */}
                <Latihan data={data} />                                      
                {/* navigation */}
                <Navigation data={data} materiId={materiId} />           
            </div>
        </div>
    </div>
  )
}

export default Pembahasan