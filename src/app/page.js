import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-full w-full bg-primary2 flex flex-col">
      {/* navbar */}
      <div className= "h-1/12 md:h-12 bg-primary1 text-primary2"><Navbar/></div>
      {/* content */}  
          <div className= "h-10/12 flex flex-col lg:flex-row mx-auto">
            {/* Image Container */}
            <div className= "h-1/2 relative lg:h-full lg:w-1/2">
              <Image src="/hero.png" alt="" fill className="object-contain lg:py-20 lg:mx-auto"/>
            </div>
            {/* Text Container */}
            <div className="h-1/2 lg:h-full lg:w-1/2 flex  ">
              <div className="lg:w-4/5 flex flex-col  mx-auto justify-center mx-auto md:mx-auto">
                <div className="lg:pr-20">
                  <h1 className="text-5xl text-primary1 md:text-6xl border-l-8 border-primary1 pl-3 rounded-l-lg font-bold">Tempat Belajar Bahasa turki
                    <span className="content__container block font-light text-3xl md:text-4xl justify-center md:h-13">
                      <ul className="content__container__list ">
                        <li  className="content__container__list__item  text-primary1 font-bold md:leading-13">otodidak</li>
                        <li className="content__container__list__item text-primary1 font-bold md:leading-13">mandiri</li>
                        <li className="content__container__list__item text-primary1 font-bold md:leading-13">dimana saja</li>
                        <li className="content__container__list__item text-primary1 font-bold md:leading-13">kapan saja</li>
                      </ul>
                    </span>
                  </h1>
                </div>
                <div className="text-2xl mt-8 flex animate-bounce justify-center">
                  <button className="bg-primary1 p-2 rounded-lg text-primary2  hover:bg-primary2 hover:text-primary1 ">mulai</button>
                </div>
              </div>
              
            </div>
            
          </div>      
      {/* footer */}
      <div className="h-1/12 justify center text-primary1 text-xl mx-auto mb-2" >
        powered by ummati.com
      </div>                       
    </div>      
  );
}
