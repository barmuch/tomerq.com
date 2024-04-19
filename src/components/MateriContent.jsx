
"use client";
import React, { useState } from 'react';


export default function MateriContent({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const showMateri = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-primary2 w-max-full h-screen flex flex-col items-center py-6 gap-4'>
            <div className='text-4xl font-semibold text-black'>{data?.title}</div>

            <div className='text-2xl px-3 text-black text-justify leading-tight indent-8 w-4/5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>

            {/* materi */}      
            <div className='flex flex-col w-4/5 items-start gap-2 my-6'>
                <div className='bab text-2xl text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row gap-2 items-center cursor-pointer hover:bg-hover2' onClick={showMateri}>
                    <div>Bab 1</div>
                </div>
                {isOpen && (
                    <div className='item flex flex-col text-black'>
                        {data.materis.map((materi) => (
                            <div className='bg-black justify-items-start text-xl pl-3' key={materi.title}>-{materi.title}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
