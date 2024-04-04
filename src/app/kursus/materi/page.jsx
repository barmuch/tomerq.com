import Navbar from '@/components/navbar'
import Image from 'next/image'
const materi = () => {
  return (
    <div className=''>
        <div className='bg-primary1 text-primary2'><Navbar/></div>
        <div className='bg-primary2 w-max-full h-screen flex flex-col items-center py-6 gap-4 '>
            
            <div className='text-6xl font-semibold text-black'>A1</div>

            <div className='text-2xl px-3 text-black text-justify leading-tight indent-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
           
            {/* materi */}
            <div className='flex flex-col w-4/5 items-center gap-4 my-6'>
                {/* materi item */}
                <div className='text-2xl  text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row justify-between items-center'>
                    <div>Bab 1</div>
                    <div><Image src="/polygon.png" alt="" width={24} height={24} /></div>
                </div>

                <div className='text-2xl  text-primary2 bg-primary1 w-full rounded-lg p-2 flex flex-row justify-between items-center'>
                    <div>Bab 2</div>
                    <div><Image src="/polygon.png" alt="" width={24} height={24} /></div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default materi