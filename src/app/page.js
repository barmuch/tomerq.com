import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-primary2">
      <div className= "h-8 md:h-12"><Navbar/></div>
      <div className= "h-[calc(100%-2rem)] md:h-[calc(100%-3rem)] lg:h-[calc(100%-4rem)]">  
          <div className= "h-full flex flex-col lg:flex-row justify-start">
            {/* Image Container */}
            <div className= "h-1/2 relative lg:h-full lg:w-1/2">
              <Image src="/hero.png" alt="" fill className="object-contain p-5  lg:py-20 lg:mx-"/>
            </div>
            {/* Text Container */}
            <div className="h-1/2 lg:h-full lg:w-1/2 flex  ml-5 ">
              <div className="lg:w-4/5 flex flex-col  mx-auto justify-center ml-2 md:mx-auto">
                <div className="lg:pr-20">
                  <h1 className="text-4xl md:text-6xl border-l-8 border-primary1 pl-3 rounded-l-lg ">tempat belajar bahasa turki
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
                <div className="text-2xl mt-8 flex animate-bounce  ">
                  <button className="bg-primary1 p-2 rounded-lg text-primary2  hover:bg-primary2 hover:text-primary1 ">mulai</button>
                </div>
              </div>
            </div>
            
          </div>
      </div>                         
    </div>      
  );
}
