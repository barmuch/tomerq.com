import Navbar from "@/components/navbar"

const SingleForum = () => {
  return (
    <div className="h-screen w-screen flex flex-col ">
        <div className="md:h-12 bg-primary1 text-primary2 border-b-1">
            <Navbar/>
        </div>
        <div className="flex-1 flex md:flex-row max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden gap-4 px-4 justify-center">
            <div className="w-full md:w-4/5 bg-primary2 rounded-lg overflow-y-auto py-3">
                {/* title */}
                <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">Forum Pertanyaan</div>
                {/* container */}
                <div className="flex flex-col w-4/5 gap-4 mx-auto mt-2">
                    {/* post pertanyaan */}
                    <div className="w-full flex-col flex gap-2 rounded-lg shadow-2xl bg-white p-2 gap-2">
                        <textarea
                            id="post"
                            name="post"
                            rows="3"
                            cols="33"
                            className=" resize-none p-2"
                            placeholder="Apa yang ingin kamu tanyakan?..."
                        ></textarea>
                        <div className="flex justify-end">           
                            <div className="bg-primary1 hover:hover2  rounded-lg text-primary2 w-fit p-2 hover:bg-hover2 cursor-pointer">balas</div>  
                        </div>    
                    </div>                 
                    
                    {/* daftar pertanyaan */}
                <div className="text-2xl font-semibold">diskusi</div>
                <div className="flex flex-col gap-2 ml-10">                  
                    <div className="w-full bg-white h-1/5 rounded-lg drop-shadow-2xl p-2 gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer">                        
                        <div className="indent-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nemo, repudiandae tempora corrupti debitis pariatur illum adipisci numquam ab doloribus ullam facilis deleniti obcaecati assumenda magnam libero, ipsum a beatae, quia quae accusantium ex minus. Rerum asperiores adipisci esse nostrum!</div>
                        <div className="flex flex-row justify-between">
                            <div className="text-sm">dari: Akbar</div>
                            <div className="text-sm">balas</div>
                        </div>
                        
                    </div>
                </div>

                </div>
            </div>
            <div className="md:w-1/5 bg-primary2 rounded-lg py-3 hidden ">
                <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">Berita & Artikel</div>

            </div>
        </div>
    </div>
  )
}

export default SingleForum