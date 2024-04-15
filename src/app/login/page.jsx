import Navbar from "@/components/navbar";
import Image from "next/image"
const Login = () => {

  
  return (
<div className="h-screen w-screen flex flex-col">
  {/* Navbar */}
  <div className="h-1/12 w-full bg-primary1 text-primary2"><Navbar/></div>
  {/* content */}
  <div className="flex-1 bg-gradient-to-b from-primary1 to-hover2 py-5 border-t-2 border-primary2 ">
    {/* container putih*/}
      <div className="flex flex-col h-full gap-4 py-5  w-11/12 md:w-1/4 bg-primary2 mx-auto rounded-lg px-4 ">
         <div className=" items-center content-center flex-col flex my-auto gap-6">
            <div className="text-3xl font-semibold text-black text-center">Login with
            </div> 
            {/* Provider Item */}
            <div className="w-3/5 border-black border-2 p-3 rounded-lg text-center flex flex-row gap-2 pl-6 divide-x">
                <Image src="/google.png" alt="" width={24} height={24} />   
                <div className="pl-2">Google</div>
            </div>
            <div className="w-3/5 border-black border-2 p-3 rounded-lg flex flex-row gap-2 pl-6 divide-x">
                <Image src="/instagram-color.png" alt="" width={24} height={24} />
                <div className="pl-2">Instagram</div>
            </div>
        </div>
      </div>  
  </div>
</div>
  )
}

export default Login