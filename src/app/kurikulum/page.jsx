import Navbar from "@/components/navbar";

const Kurikulum = () => {

  const kurikulums = [
    {
      title : "Pengenalan Bahasa Turki"
    },
    {
      title : "A1 Grammar : Beginner"
    },
    {
      title : "A2 Grammar : Beginner"
    },
    {
      title : "B1 Grammar : Intermediate"
    },
    {
      title : "B2 Grammar : Intermediate"
    },
    {
      title : "C1 Grammar : Advanced"
    },
    {
      title : "C2 Grammar : Advanced"
    }
  ]
  return (
<div>
  {/* Navbar */}
  <div className="w-full bg-primary1 text-primary2"><Navbar/></div>
{/* content */}
  <div className="max-w-full bg-primary1 py-5 border-t-2 border-primary2">
    {/* container putih*/}
      <div className="flex flex-col gap-4 py-5  w-11/12 bg-primary2 h-11/12 mx-auto rounded-lg px-4">
        {/* Title */}
          <div className="text-2xl text-black font-bold lg:text-4xl justify-center flex text-center">
            Welcome to tomerQ.com
          </div>
        {/* quotes */}          
          <div className="flex flex-col bg-primary2 text-black w-max-full p-2 rounded-lg w-11/12 lg:w-3/5 text-justify indent-4 gap-2 mx-auto justify-center lg:text-2xl">
            <div>“Salah satu pengerdilan dalam hidup adalah membiarkan pikiran yang cemerlang menjadi budak bagi tubuh yang malas, yang mendahulukan istirahat sebelum lelah.”</div>
            <div className="text-center">- H A M K A -</div>
          </div>
          {/* title  */}
          <div className=" text-xl lg:text-3xl text-black justify-start font-bold w-11/12 lg:w-3/5  mx-auto">Kurikulum</div>
          {kurikulums.map((kurikulum) => (
            <div key={kurikulum.title} className="flex flex-row bg-primary2 text-black w-max-full p-2 rounded-lg mx-auto w-11/12 lg:w-3/5 hover:bg-hover1 cursor-pointer border-2 border-black">
            {kurikulum.title}
          </div>   
          ))}
               
      </div>  
  </div>
</div>
  )
}

export default Kurikulum