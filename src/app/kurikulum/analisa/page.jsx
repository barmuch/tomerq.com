"use client"

import Navbar from "@/components/navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { useState, useEffect } from "react";
import converter from "@/utils/converterSimdikiZaman"

const Analisa = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        const storage = getStorage(app);
        const forestRef = ref(storage, 'images/analisa/simdiki-zaman.png');
        
        getDownloadURL(forestRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Error getting download URL:", error);
            });
    }, []);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const convert = () => {
        const hasil = converter(input);
        setOutput(hasil);
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            {/* Navbar */}
            <div className="h-1/12 w-full bg-primary1 text-primary2">
                <Navbar />
            </div>
            {/* content */}
            <div className="w-full bg-primary1 py-5 border-t-2 border-primary2 flex lg:flex-1 lg:overflow-hidden flex-col gap-4 lg:flex-row lg:px-4 ">
                {/* teori dan contoh */}
                <div className="flex flex-col gap-6 w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto overflow-x-hidden lg:p-4 p-2">
                    <div className="lg:text-3xl text-2xl font-semibold text-black text-center">Şimdiki Zaman(yor)</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black lg:text-start text-justify"> Sebelum menganalisa perubahan Şimdiki Zaman, pastikan teman-teman sudah paham materi Şahış(kata ganti orang) dan materi kata kerja dasar terlebih dahulu</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black text-start"> Contoh tahapan mengubah kata kerja dasar menjadi Şimdiki Zaman</div>
                    {imageUrl && <Image src={imageUrl} alt="" width={800} height={800} className="object-contain lg:ml-auto" />}
                </div>
                {/* converter */}
                <div className="flex flex-col lg:text-2xl gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5 overflow-y-auto">
                    <div className="text-2xl font-semibold text-black text-center">Converter</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black text-start">Masukkan kata kerja dasar dan ubah jadi Şimdiki Zaman</div>
                    <input type="text" value={input} onChange={handleInputChange} />
                    <button onClick={convert} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                    <div>hasil: {output}</div>
                </div>
            </div>
        </div>
    );
}

export default Analisa;
