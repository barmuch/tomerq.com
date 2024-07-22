
import Image from 'next/image'
import Link from 'next/link'

const Maintenance = () => {
  
  return (
    <div className="flex-1 h-max-full h-full min-h-screen w-full bg-primary2 flex flex-col content-between gap-6 lg:gap-0">
      
      {/* content */}
      <div className="h-11/12 flex flex-col lg:flex-row items-center lg:mx-auto">
        {/* Image Container */}
        <div className="h-1/2 lg:h-full lg:w-1/2">
          <Image src="/maintenance.png" alt="" width={400} height={400} className="object-contain lg:py-20 lg:ml-auto" />
        </div>
        {/* Text Container */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex ">
          <div className="lg:w-4/5 flex flex-col pl-2 mx-auto items-center">
            <div className="lg:pr-20">
              <h1 className="text-5xl text-primary1 md:text-6xl border-l-8 border-primary1 pl-3 rounded-l-lg font-bold">
                Maaf, Halaman ini sedang dalam perbaikan
                
              </h1>
            </div>
            <div className="text-2xl mt-8 flex justify-center">
              <Link href="/">
                <button className="bg-primary1 p-2 rounded-lg text-primary2  hover:bg-primary2 hover:text-primary1 ">back to home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="h-1/12 text-primary1 text-xl mx-auto items-center my-auto">
        powered by ummati.com
      </div>
    </div>
  );
}

export default Maintenance