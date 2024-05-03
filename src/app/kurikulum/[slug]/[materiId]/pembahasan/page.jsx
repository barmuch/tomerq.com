"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"
import Loading from "@/components/loading/page"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from "@/utils/firebase"
import Image from "next/image"
import converterAngka from "@/utils/converterAngka"

const Pembahasan = ({params}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)    
    const { materiId } = {...params}
    const [inputAnswer, setInputAnswer] = useState('')
    const [result, setResult] = useState({})
    const [imageUrl, setImageUrl] = useState('')  
    const [angkaInput, setAngkaInput] = useState('');
    const [teksOutput, setTeksOutput] = useState('');
    
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
    const forestRef = ref(storage, `images/${data?.contoh?.image}.png`)

    getDownloadURL(forestRef)
        .then((url) => {
            setImageUrl(url);
        })
        .catch((error) => {
            console.error("Error getting download URL:", error);
        });
    
    
        const handleInputChange = (event) => {
            setAngkaInput(event.target.value);
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
                    <div className=" mt-2 text-justify indent-6 lg:text-2xl" ><div dangerouslySetInnerHTML={{ __html: data?.teori }} /></div>
                </div> 
                {/* contoh */}
                <div className="p-4 flex flex-col">
                    <div className="items-start font-bold border-black lg:text-2xl">contoh</div>
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
                </div>
                {/* converter */}
                
                {/* catatan */}
                {data?.catatan?.item&&(
                <div className="border-2 border-primary1 m-2 rounded-lg">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Catatan</div>
                    {data?.catatan?.item?.map((item)=>{
                        return (
                        <div className="text-justify p-2 lg:text-2xl" key={item.id}><div dangerouslySetInnerHTML={{ __html: item?.poin }} /></div>
                        )
                    })}
                </div>
                )}
                {/* kosakata */}
                {data?.kosakata?.item&&(<div className="border-2 border-primary1 m-2 rounded-lg w-full lg:text-2xl">
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
                                <button onClick={konversiAngkaKeTeks} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">Konversi</button>
                            <div>hasil: {teksOutput}</div>
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
                        const cleanedValue = event.target.value.replace(/[^a-zA-Z]/g, '')
                        setInputAnswer(prevState => ({
                          ...prevState,
                          [questionId]: cleanedValue
                        }))
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
                                  className="bg-primary1 px-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer"
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