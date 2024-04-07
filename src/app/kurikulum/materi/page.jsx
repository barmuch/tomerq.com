"use client"
import Navbar from '@/components/navbar'
import Image from 'next/image'
import {useState} from 'react'
const Materi = () => {

    const materis = [
        {
            title : "materi 1" 
        },
        {
            title : "materi 2"
        },
        {
            title : "materi 3"
        },
        {
            title : "materi 4"
        },
        {
            title : "materi 5"
        }
    ]
    const [isOpen, setIsopen] = useState(false)
    const showMateri = () => {
        setIsopen(!isOpen)
    }
    
  return (
    <div className=''>
        <div className='bg-primary1 text-primary2'><Navbar/></div>
        <div className='bg-primary2 w-max-full h-screen flex flex-col items-center py-6 gap-4 '>
            
            <div className='text-4xl font-semibold text-black'>A1 Grammar : Beginner</div>

            <div className='text-2xl px-3 text-black text-justify leading-tight indent-8 w-4/5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
           
            {/* materi */}
            <div className='flex flex-col w-4/5 items-start gap-2 my-6'>
                {/* Bab item */}
                <div className='bab text-2xl  text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row gap-2 items-center cursor-pointer hover:bg-hover2' onClick={showMateri}>
                    <div className=''>Bab 1</div>
                </div>
                {/* Materi Item */}
                {isOpen &&(
                <div className='item flex flex-col text-black '>
                    {materis.map((materi)=>(
                            <div className='bg-black justify-items-start text-xl pl-3' key={materi.title}>-{materi.title}</div>
                        ))}
                </div>
                )}    
                {/* Bab Item */}
                <div className='text-2xl  text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row justify-between items-center'>
                    <div>Bab 2</div>
                    <div><Image src="/polygon.png" alt="" width={24} height={24} /></div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Materi