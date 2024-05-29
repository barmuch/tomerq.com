"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"
import Loading from "@/components/loading/page"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from "@/utils/firebase"
import Image from "next/image"
import Link from "next/link"
import converterAngka from "@/utils/converterAngka"
 


const Pembahasan = ({params}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)    
    const { materiId } = {...params}
    const [inputAnswer, setInputAnswer] = useState('')
    const [result, setResult] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [analisaUrl, setAnalisaUrl] = useState('')
    const [angkaInput, setAngkaInput] = useState('');
    const [jam, setJam] = useState('');
    const [menit, setMenit] = useState('');
    const [jamTeks, setJamTeks] = useState('')
    const [teksOutput, setTeksOutput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedImage(selectedOption);
    };
    
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
    // firebase set up
    const storage = getStorage(app);
    // contohUrl
    const forestRef = ref(storage, `images/${data?.contoh?.image}.png`) 
    getDownloadURL(forestRef)
        .then((url) => {
            setImageUrl(url);
        })
        .catch((error) => {
            console.error("Error getting download URL:", error);
        });
    
    // Analisa Url
    const forestRefAnalisa = ref(storage, `images/${selectedImage}/${data?.materiSlug}.png`) 
    getDownloadURL(forestRefAnalisa)
        .then((url) => {
            setAnalisaUrl(url);
        })
        .catch((error) => {
            console.error("Error getting download URL:", error);
        });
        const handleInputChange = (event) => {
            setAngkaInput(event.target.value);
        };
        const handleJamChange = (event) => {
            setJam(event.target.value);
        };
        const handleMenitChange = (event) => {
            setMenit(event.target.value);
        };
    
        const konversiAngkaKeTeks = () => {
            const angka = parseInt(angkaInput, 10);
            if (!isNaN(angka)) {
                const teks = converterAngka(angka);
                setTeksOutput(teks);
            } else {
                setTeksOutput('Masukkan angka yang valid');
            } 
    }
    const konversiJamKeTeks = () => {
        if (jam === '' || menit === '') {
          setJamTeks('Silahkan isi jam dan menit.');
          return;
        }
    
        let jamNum = parseInt(jam, 10);
        const menitNum = parseInt(menit, 10);
    
        if (isNaN(jamNum) || isNaN(menitNum) || jamNum < 0 || jamNum > 24 || menitNum < 0 || menitNum > 59) {
          setJamTeks('Invalid input. Masukkan jam dan menit yang benar');
          return;
        }
        if (jamNum > 12) {
            jamNum -= 12;
        }
    
        const turkishJam0 = [
          "sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"
        ];
    
        const turkishJam1 = {
          0: "sıfır", 1: "biri", 2: "ikiyi", 3: "üçü", 4: "dördü",
          5: "beşi", 6: "altıyı", 7: "yediyi", 8: "sekizi", 9: "dokuzu",
          10: "onu", 11: "on biri", 12: "on ikiyi"
        };
    
        const turkishJam2 = {
          0: "sıfır", 1: "bire", 2: "ikiye", 3: "üçe", 4: "dörde",
          5: "beşe", 6: "altıya", 7: "yediye", 8: "sekize", 9: "dokuza",
          10: "ona", 11: "on bire", 12: "on ikiye"
        };
    
        const turkishMinutes = {
          0: "", 1: "bir", 2: "iki", 3: "üç", 4: "dört",
          5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz",
          10: "on", 11: "on bir", 12: "on iki", 13: "on üç", 14: "on dört",
          15: "çeyrek", 16: "on altı", 17: "on yedi", 18: "on sekiz", 19: "on dokuz",
          20: "yirmi", 21: "yirmi bir", 22: "yirmi iki", 23: "yirmi üç", 24: "yirmi dört",
          25: "yirmi beş", 26: "yirmi altı", 27: "yirmi yedi", 28: "yirmi sekiz", 29: "yirmi dokuz",
          30: "buçuk", 31: "otuz bir", 32: "otuz iki", 33: "otuz üç", 34: "otuz dört",
          35: "otuz beş", 36: "otuz altı", 37: "otuz yedi", 38: "otuz sekiz", 39: "otuz dokuz",
          40: "kırk", 41: "kırk bir", 42: "kırk iki", 43: "kırk üç", 44: "kırk dört",
          45: "çeyrek", 46: "kırk altı", 47: "kırk yedi", 48: "kırk sekiz", 49: "kırk dokuz",
          50: "elli", 51: "elli bir", 52: "elli iki", 53: "elli üç", 54: "elli dört",
          55: "elli beş", 56: "elli altı", 57: "elli yedi", 58: "elli sekiz", 59: "elli dokuz"
        };
    
        let hasil;
    
        if (menitNum == 0) {
          hasil = `saat ${turkishJam0[jamNum]}`;
        } else if (menitNum < 30) {
          hasil = `saat ${turkishJam1[jamNum]} ${turkishMinutes[menitNum]} geçiyor `;
        } else if (menitNum === 30) {
            hasil = `saat ${turkishJam0[jamNum]} ${turkishMinutes[menitNum]}`
        } else {
          const nextHour = jamNum + 1;
          const remainingMinutes = 60 - menitNum;
          hasil = `saat ${turkishJam2[nextHour]} ${turkishMinutes[remainingMinutes]} var `;
        }
    
        setJamTeks(hasil);
    }
    
    console.log(jam)

 
return (
    <div className=" flex flex-col h-screen">
        {/* navbar */}
        <div className="md:h-12 bg-primary1 text-primary2"><Navbar/></div>
        {/* content */}
        <div className="w-full bg-primary1 py-5 border-t-2 border-primary2 flex lg:flex-1 lg:overflow-hidden flex-col gap-4 lg:flex-row lg:px-4 ">
            {/* teori dan contoh */}
            <div className="flex flex-col gap-4 w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto overflow-x-hidden">
                {/* Teori */}
                <div className=" flex flex-col border-b-2 border-black p-4">
                    <div className="items-start font-bold lg:text-2xl"> {data?.materiTitle}</div>
                    <div className=" mt-2 text-justify indent-6 md:text-2xl" ><div dangerouslySetInnerHTML={{ __html: data?.teori }} /></div>
                </div> 
                {/* contoh */}
                {data?.contoh&&(
                <div className=" flex flex-col">
                    <div className="items-start font-bold border-black lg:text-2xl m-4">contoh</div>
                    {/* list contoh item */}
                    {data?.contoh?.image&&(
                        <Image src={imageUrl} 
                        alt=""
                        width={800}
                        height={800}                
                         />
                    )}
                    {data?.contoh?.item?.map((item)=>{
                        return (
                        <div className="text-justify p-2 lg:text-2xl" key={item.id}><div dangerouslySetInnerHTML={{ __html: item?.poin }} /></div>
                        )
                    })}
                </div>)}
                
                {/* Perubahan Grammar */}
                {data?.materiId === '662cb2809baf839692c266c3' &&(
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
                 )} 
                
                {/* catatan */}  
                {data?.catatan?.item&&(
                <div className="border-2 border-primary1 m-2 rounded-lg lg:text-2xl">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Catatan</div>
                    {data?.catatan?.item?.map((item)=>{
                        return (
                        <div className="text-justify p-2 lg:text-2xl" key={item.id}><div dangerouslySetInnerHTML={{ __html: item?.poin }} /></div>
                        )
                    })}
                </div>
                )}
                {/* TIPS */}
                {data?.tips&&(
                <div className="border-2 border-primary1 m-2 rounded-lg">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Tips</div>
                        <div className="text-justify p-2 lg:text-2xl" ><div dangerouslySetInnerHTML={{ __html: data?.tips?.item }} /></div>
                        
                </div>
                )}

                {/* kosakata */}
                {data?.kosakata?.item&&(
                <div className="border-2 border-primary1 m-2 rounded-lg lg:text-2xl">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg">Kosakata</div>
                    <div className="text-justify p-2 flex flex-col lg:flex-row flex-wrap lg:pl-10">
                        {data?.kosakata?.item?.map((item)=>{
                         return (                            
                         <div className="w-1/2 mb-2 text-start" key={item.id}><li>{item.poin}</li></div>
                        )              
                        })}
                    </div>
                </div>)}
                
                
                
            </div>
            {/* latihan */}
            <div className="flex flex-col lg:text-2xl gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5 overflow-y-auto">
                {/* Analisa Navigation */}
                {data?.analisa&&(
                    <div className="border-2 border-primary1 rounded-lg">
                        <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Mari Menganalisa !</div>
                        <div className="text-justify p-2 lg:text-2xl" >Pelajari perubahan imbuhan grammar  disini =&gt; <Link href={`/analisa/${data.analisa}`} className="underline text-blue hover:text-hover3"> Analisa Grammar</Link></div>                      
                   </div>
                )}
                {/* title */}
                {data?.latihan&&(
                    <div className="font-bold justify">Latihan</div>
                )}   
                {/* converter */}
                {data?.materiId === '662cb0d79baf839692c266b4' && (
                    <div className="border-2 border-primary1 m-2 rounded-lg text-2xl">
                        <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg"> Cari tau!</div>
                        <div className="p-2">
                            <div className="mr-2"> Masukkan angka yang ingin kamu cari tau</div>
                            <input type="number" value={angkaInput} onChange={handleInputChange} />
                                <button onClick={konversiAngkaKeTeks} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                            <div>hasil: {teksOutput}</div>
                        </div>
                    </div>

                )}
                {/* converter */}
                {data?.materiId === '662cbabe9baf839692c266f7' && (
                    <div className="border-2 border-primary1 m-2 rounded-lg text-2xl">
                        <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg"> Cari tau!</div>
                        <div className="p-2">
                            <div className="mr-2"> Masukkan Jam, dan lihat bagaimana cara bacanya</div>
                            <div className="flex flex-row justify-center">
                                <div className="">                                
                                    <input type="number" value={jam} onChange={handleJamChange} style={{ width: "65px"  }} className="px-2 border-2 border-black rounded-lg"/>
                                    <div className="text-center text-lg">jam</div>
                                </div>
                                <div>.</div>
                                <div className="">
                                     <input type="number" value={menit} onChange={handleMenitChange} style={{ width: "65px"  }} className="px-2 border-2 border-black rounded-lg"/>
                                    <div className="text-center text-lg">menit</div>
                                </div>
                            </div>
                             <div className="justify-center flex mt-2">
                                <button onClick={konversiJamKeTeks} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                             </div>
                            <div>hasil: {jamTeks}</div>
                        </div>
                    </div>

                )}     
                {/* perintah latihan */}
                <div className="text-justify indent-6">
                    <div dangerouslySetInnerHTML={{ __html: data?.latihan?.petunjuk  }} />                  
                </div>
                {/* soal Latihan */}
                <div className="flex flex-col gap-2">
                   {data?.latihan?.item.map((question)=>{
                    const handleChange = (questionId, event) => {
                        const cleanedValue = event.target.value.replace(/[^a-zA-ZığüşöçĞÜŞÖÇıİ]/g, '');
                        setInputAnswer(prevState => ({
                          ...prevState,
                          [questionId]: cleanedValue
                        }))
                    }
                    const handleKeyDown = (event, questionId) => {
                        if (event.key === "Enter") {
                          checkAnswer(questionId);
                        }
                      }
                    const checkAnswer = (questionId) => {                     

                        const userAnswer = inputAnswer[questionId];
                        const correctAnswer = data.latihan.item.find(question => question.id === questionId).answer;
                        const isCorrect = userAnswer.toString && userAnswer.toLowerCase() === correctAnswer.toLowerCase();
                        setResult(prevState => ({
                        ...prevState,
                        [questionId]: isCorrect
                    }))
                    }
                    const kalimat = question.question
                    const posisiInput = kalimat.indexOf(question.input);
                    const kalimatAwal = kalimat.slice(0, posisiInput + question.input.length);
                    const kalimatAkhir = kalimat.slice(posisiInput + question.input.length);
                    
                    return (
                        <div className="flex flex-row justify-between" key={question.id}>
                                <div className="items-center">
                                {kalimatAwal}<input
                                className="border-b border-black"
                                type="text"
                                style={{ width: "75px"  }}
                                onChange={(event) => handleChange(question.id, event)}
                                onKeyDown={(event) => handleKeyDown(event, question.id)} 

                                />{kalimatAkhir}

                              
                                  {
                                        Object.keys(result).length !== 0 ? (
                                            result[question.id] !== undefined ? (
                                                result[question.id] === null ? (
                                                    <span style={{ marginLeft: "10px", color: "black" }}>Masukkan jawaban Anda</span>
                                                ) : (
                                                    <span style={{ marginLeft: "10px", color: result[question.id] ? "green" : "red" }}>
                                                        {result[question.id] ? "Benar" : "Salah"}
                                                    </span>
                                                )
                                            ) : null
                                        ) : null 
                                    }
                                        
                                      
                                </div>
                                <div
                                  className="bg-primary1 px-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer content-center"
                                  onClick={() => checkAnswer(question.id)}
                                >
                                  cek
                                </div>
                              </div>
                            );
                    })}              
                </div>
                {/* button latihan */}
                <div className="justify-self-end flex flex-row gap-2 text-2xl">
                    <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold cursor-pointer hover:bg-hover1">Tanya Forum</button>
                    <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer w-1/2  ">lanjut</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pembahasan