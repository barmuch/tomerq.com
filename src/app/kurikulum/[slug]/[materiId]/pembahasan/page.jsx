"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"
import Loading from "@/components/loading/page"

const Pembahasan = ({params}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)    
    const { materiId } = {...params}
    const [inputAnswer, setInputAnswer] = useState('')
    const [result, setResult] = useState({})

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
    
return (
    <div className=" flex flex-col h-screen">
        {/* navbar */}
        <div className="md:h-12 bg-primary1 text-primary2"><Navbar/></div>
        {/* content */}
        <div className="w-full bg-primary1 py-5 border-t-2 border-primary2 flex lg:flex-1 lg:overflow-hidden flex-col gap-4 lg:flex-row lg:px-4 ">
            {/* teori dan contoh */}
            <div className="flex flex-col gap-4 w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto">
                {/* Teori */}
                <div className=" flex flex-col border-b-2 border-black p-4">
                    <div className="items-start font-bold "> {data?.materiTitle}</div>
                    <div className=" text-justify indent-6" ><div dangerouslySetInnerHTML={{ __html: data?.teori }} /></div>
                </div>
                {/* contoh */}
                <div className="p-4 flex flex-col">
                    <div className="items-start font-bold border-black">contoh</div>
                    {/* list contoh item */}
                    <div>
                    Kitap kitaplr, buku = buku buku  
                    </div>
                </div>
                {/* catatan */}
                <div className="border-2 border-primary1 m-2 rounded-lg">
                    <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg">Catatan</div>
                    <div className="text-justify p-2">Huruf yang berwarna merah adalah huruf vokal terakhir kata tersebut. Jika termasuk kedalam salah satu huruf Kalın [ a, ı, o, u ], maka akan berimbuhan -lar. Jika termasuk kedalam salah satu huruf İnce [ e, i, ö, ü ], maka akan berimbuhan   -ler</div>
                </div>
            </div>
            {/* latihan */}
            <div className="flex flex-col gap-4 py-5 w-11/12 bg-primary2 lg:h-11/12 mx-auto rounded-lg px-4 lg:w-2/5">
                {/* title */}
                <div className="font-bold justify">Latihan</div>
                {/* perintah latihan */}
                <div className="text-justify indent-6">
                    {data?.latihan?.petunjuk}                   
                </div>
                {/* soal Latihan */}
                <div className="flex flex-col gap-2">
                   {data?.latihan?.item?.map((question)=>{
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
                        const isCorrect = userAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase();
                        setResult(prevState => ({
                        ...prevState,
                        [questionId]: isCorrect
                    }))
                    }
                    console.log(result)
                                        
                    return (
                        <div className="flex flex-row justify-between" key={question.id}>
                                <div className="items-center">
                                  {question.question}
                                  <input
                                    className="border-b border-black  focus:outline-none focus:border-blue-500"
                                    type="text"
                                    style={{ width: "75px" }}
                                    onChange={(event) => handleChange(question.id, event)}
                                  />
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
                <div className="justify-self-end flex flex-row gap-2">
                    <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold cursor-pointer hover:bg-hover1">Tanya Forum</button>
                    <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer w-1/2  ">lanjut</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pembahasan