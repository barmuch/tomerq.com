"use client"

import Navbar from "@/components/navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { useState, useEffect } from "react";
import {ben, sen, o, biz, siz, onlar} from "@/utils/isimCumleleriConverter"
import {benSoru, senSoru, oSoru, bizSoru, sizSoru, onlarSoru} from "@/utils/isimCumleleriSoru"


const Analisa = () => {
    const [input, setInput] = useState('');
    const [subjek, setSubjek] = useState(null);
    const [soru, setSoru] = useState([])
    const [analisaUrl, setAnalisaUrl] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    const storage = getStorage(app);
    // Analisa Url
    const forestRefAnalisa = ref(storage, `images/${selectedImage}/isim-cumleleri.png`) 
    getDownloadURL(forestRefAnalisa)
        .then((url) => {
            setAnalisaUrl(url);
        })
        .catch((error) => {
            console.error("Error getting download URL:", error);
        });
    const handleInputChange = (event) => {
        const lowercaseInput = event.target.value.toLowerCase();
        setInput(lowercaseInput)
    };

    const handleImageChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedImage(selectedOption);
    };

    const convert = () => {
        const hasil = [
            {'ben' : ben(input)}, 
            {'sen' : sen(input)}, 
            {'o' : o(input)}, 
            {'biz': biz(input)}, 
            {'siz' : siz(input)}, 
            {'onlar': onlar(input)}];
        
        const negatif = [
            { ben: 'değilim' }, 
            { sen: 'değilsin' },
            { o: 'değil' },
            { biz: 'değiliz' },
            { siz: 'değilsiniz' },
            { onlar: 'değiller' }
        ]

        const result = hasil.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            const negatifValue = negatif.find(neg => neg.hasOwnProperty(key))[key];
            return { key, value, negatif: input + ' ' + negatifValue };
        });

        setSubjek(result);

        const hasilSoru = [
            {'ben' : benSoru(input)}, 
            {'sen' : senSoru(input)}, 
            {'o' : oSoru(input)}, 
            {'biz': bizSoru(input)}, 
            {'siz' : sizSoru(input)}, 
            {'onlar': onlarSoru(input)}];
        
        const negatifSoru = [
            { ben: 'değil miyim ?' }, 
            { sen: 'değil misin ?' },
            { o: 'değil mi ?' },
            { biz: 'değil miyiz ?' },
            { siz: 'değil misiniz ?' },
            { onlar: 'değiller mi ?' }
        ]

        const resultSoru = hasilSoru.map(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            const negatifValue = negatifSoru.find(neg => neg.hasOwnProperty(key))[key];
            return { key, value, negatif: input + ' ' + negatifValue };
        });

        setSoru(resultSoru);
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
                    <div className="lg:text-3xl text-2xl font-bold text-black text-center">İsim Cümleleri</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black lg:text-start text-justify"> Sebelum menganalisa perubahan İsim Cümleleri, pastikan teman-teman sudah paham materi sahış(kata ganti orang) terlebih dahulu</div>
                    {/* <div className="border-2 border-primary1 m-2 rounded-lg">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Catatan</div>
                        <div className="lg:text-2xl text-xl mx-2">beberapa kata pengecualian :</div>                   
                        <div className="text-justify p-2 lg:text-2xl text-xl mx-2">
                            <li>gitmek = gidiyor</li>
                            <li>tatmak = tadıyor</li>
                            <li>etmek = ediyor</li>
                            <li>yemek = yiyor</li>
                            <li>demek = diyor</li>
                        </div>                     
                    </div> */}
                    {/* Perubahan Grammar */}
                
                    <div className="p-4 flex flex-col">
                        <div className="items-start font-bold border-black lg:text-2xl">Perubahan imbuhan berdasasarkan subjek</div>
                        <div className="items-start border-black lg:text-xl flex flex-row mt-2 items-center gap-2">
                            <div>Subject</div>
                            <select className="border border-gray-300 rounded p-2" onChange={handleImageChange} >
                                <option value="">Pilih subjek...</option>
                                <option value="ben">Ben</option>
                                <option value="sen">Sen</option>
                                <option value="o">O</option>
                                <option value="biz">Biz</option>
                                <option value="siz">Siz</option>
                                <option value="onlar">Onlar</option>
                            </select>                  
                        </div>
                        {selectedImage && (
                        <div className="mt-4">
                            <Image src={analisaUrl} alt={`Image ${selectedImage}`} className="mt-2" width={800} height={800}/>
                        </div>
                    )}
                    </div>
                 
                </div>

                {/* converter */}
                <div className="flex flex-col lg:text-2xl gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5 overflow-y-auto">
                    <div className="text-2xl font-semibold text-black text-center">Converter</div>
                    <div className="indent-6 lg:text-2xl text-xl text-black text-start">Masukkan kata benda dan ubah jadi İsim cümleleri</div>
                    <input type="text" value={input} onChange={handleInputChange} className="border-black border-2 placeholder-gray-500 px-2 py-1 text-gray-500" placeholder="masukkan kata benda..." />
                    <button onClick={convert} className="bg-primary1 text-primary2 px-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                    <div className="flex flex-col gap-2">
                        
                        {subjek&&(<div className="flex flex-col gap-2">
                            <div>Hasil İsim Cümleleri</div>
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
                                                        
                            <div className="divide-y gap-2 border-black border-2">
                                <div className="grid grid-cols-7 text-center items-center divide-x p-1 bg-primary1 text-primary2">
                                    <div className="col-span-1 px-2 text-base">Subjek</div>
                                    <div className="col-span-3">+?</div>
                                    <div className="col-span-3">-?</div>
                                </div>
                                {soru.map((item, index) => (
                                <div className="grid grid-cols-7 text-center divide-x p-1" key={item}>
                                    <div className="col-span-1">{item.key}</div>
                                    <div className="col-span-3">{item.value}</div>
                                    <div className="col-span-3">{item.negatif}</div>
                                </div>
                                ))}                            
                            </div>
                        </div>)}
                        
                    
                
                        
                        
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
