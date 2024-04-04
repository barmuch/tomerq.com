import Navbar from "@/components/navbar";

const kursus = () => {
  return (
<div>
<div className="bg-primary2 text-primary1"><Navbar/></div>
    <div className="max-w-full">
      <div className="flex flex-col bg-primary1 gap-4 py-5 items-center lg:h-screen lg:w-screen">
          <div className="text-5xl text-primary2 font-bold lg:text-6x justify-center flex">
            kursus
          </div>
        {/* kursus item */}
          
          <div className="flex flex-row bg-primary2 text-primary1 w-max-full p-2 rounded-lg mx-3 lg:w-3/4 hover:bg-hover1 cursor-pointer">
            <div className="w-1/5 text-4xl justify-center flex items-center">A1</div>
            <div className="w-4/5 text-justify leading-tight border-l-2 border-bg-primary1 px-3">Pada level ini, peserta belajar dasar-dasar Bahasa Turki, termasuk kosakata dasar, grammar sederhana, dan ungkapan umum untuk berkomunikasi dalam situasi sehari-hari. </div>
          </div>
          
          <div className="flex flex-row bg-primary2 text-primary1 w-max-full p-2 rounded-lg mx-3 lg:w-3/4 hover:bg-hover1 cursor-pointer">
            <div className="w-1/5 text-4xl justify-center flex items-center">A1</div>
            <div className="w-4/5 text-justify leading-tight border-l-2 border-bg-primary1 px-3">Pada level ini, peserta belajar dasar-dasar Bahasa Turki, termasuk kosakata dasar, grammar sederhana, dan ungkapan umum untuk berkomunikasi dalam situasi sehari-hari. </div>
          </div>     
      </div>  
    </div>
</div>
  )
}

export default kursus