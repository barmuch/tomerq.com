"use client"

import Navbar from "@/components/navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { useState, useEffect } from "react";
import converter from "@/utils/converterSimdikiZaman"
import converterNegatif from "@/utils/converterSimdikiZamanNegatif"

const Analisa = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [subjek, setSubjek] = useState([]);
    const [soru, setSoru] = useState([])

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
        const lowercaseInput = event.target.value.toLowerCase();
        setInput(lowercaseInput)
    };

    const convert = () => {
        const hasil = converter(input);
        const hasilNegatif = converterNegatif(input)
        setOutput(hasil);

        const sub = [
            { ben: 'um' }, 
            { sen: 'sun' },
            { o: '' },
            { biz: 'uz' },
            { siz: 'sunuz' },
            { onlar: 'lar' }
        ];
        const result = sub.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            return { key, value: hasil + value, negatif : hasilNegatif + value };
        })

        setSubjek(result);

        const tanya = [
            { ben: ' muyum ?' }, 
            { sen: ' musun ?' },
            { o: ' mu ?' },
            { biz: ' muyuz ?' },
            { siz: ' musunuz ?' },
            { onlar: 'lar mı ?' }
        ]
        
        const resultTanya = tanya.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            return { key, tanya: hasil + value, tanyaNegatif : hasilNegatif + value };
        })
        setSoru(resultTanya)
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
                    <div className="lg:text-2xl text-xl font-semibold text-black text-start">Analisa Grammar</div>
                    <div className="lg:text-3xl text-2xl font-bold text-black text-center">Şimdiki Zaman(yor)</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black lg:text-start text-justify"> Sebelum menganalisa perubahan Şimdiki Zaman, pastikan teman-teman sudah paham materi sahış(kata ganti orang) dan materi kata kerja dasar terlebih dahulu</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black text-start"> Contoh tahapan mengubah kata kerja dasar menjadi Şimdiki Zaman</div>
                    {imageUrl && <Image src={imageUrl} alt="" width={800} height={800} className="object-contain lg:ml-auto" />}
                    <div className="border-2 border-primary1 m-2 rounded-lg">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Catatan</div>
                        <div className="lg:text-2xl text-xl mx-2">beberapa kata pengecualian :</div>                   
                        <div className="text-justify p-2 lg:text-2xl text-xl mx-2">
                            <li>gitmek = gidiyor</li>
                            <li>tatmak = tadıyor</li>
                            <li>etmek = ediyor</li>
                            <li>yemek = yiyor</li>
                            <li>demek = diyor</li>
                        </div>                     
                </div>
                </div>

                {/* converter */}
                <div className="flex flex-col lg:text-2xl gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5 overflow-y-auto">
                    <div className="text-2xl font-semibold text-black text-center">Converter</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black text-start">Masukkan kata kerja dasar dan ubah jadi Şimdiki Zaman</div>
                    <input type="text" value={input} onChange={handleInputChange} className="border-black border-2 placeholder-gray-500 px-2 py-1 text-gray-500" placeholder="masukkan kata dasar..." />
                    <button onClick={convert} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                    <div className="flex flex-col gap-2">
                        <div className="text-center">hasil: {output}</div>
                        {output&&(
                        <div className="flex flex-col gap-2">
                            <div>Jika ditambahkan imbuhan subjek, maka:</div>
                            <div className="divide-y gap-2 border-black border-2">
                                <div className="grid grid-cols-7 text-center items-center divide-x p-1 bg-primary1 text-primary2">
                                    <div className="col-span-1 px-2 text-base">Subjek</div>
                                    <div className="col-span-3">+</div>
                                    <div className="col-span-3">-</div>
                                </div>
                                {subjek.map((item, index) => (
                                <div className="grid grid-cols-7 text-center divide-x p-1" key={item}>
                                    <div className="col-span-1">{item.key}</div>
                                    <div className="col-span-3">{item.value}</div>
                                    <div className="col-span-3">{item.negatif}</div>
                                </div>
                                ))}                            
                            </div>
                            <div>Jika ditambahkan imbuhan subjek dan tanya, maka:</div>                            
                            <div className="divide-y gap-2 border-black border-2">
                                <div className="grid grid-cols-7 text-center items-center divide-x p-1 bg-primary1 text-primary2">
                                    <div className="col-span-1 px-2 text-base">Subjek</div>
                                    <div className="col-span-3">+?</div>
                                    <div className="col-span-3">-?</div>
                                </div>
                                {soru.map((item, index) => (
                                <div className="grid grid-cols-7 text-center divide-x p-1" key={item}>
                                    <div className="col-span-1">{item.key}</div>
                                    <div className="col-span-3">{item.tanya}</div>
                                    <div className="col-span-3">{item.tanyaNegatif}</div>
                                </div>
                                ))}                            
                            </div>
                        </div>
                    
                    )}
                        
                        
                    </div>
                    <div className="justify-self-end flex flex-row gap-2 text-2xl">
                    <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold cursor-pointer hover:bg-hover1">Tanya Forum</button>
                    <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer w-1/2  ">lanjut</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Analisa;
