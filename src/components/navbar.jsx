"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/kurikulum", title: "Kurikulum" },
  { url: "/berita", title: "Berita"},
  { url: "/forum", title: "Forum" }
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-between px-6 sm:px-8 p-1 md:px-12 lg:px-16 xl:px-32 h-full justify-center items-center ">
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
            <Link href="/">tomerQ.com</Link>        
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="text-xl md:text-2xl lg:text-3xl hidden lg:block">menu</div>
        <button className="relative w-8 h-6 flex flex-col justify-between z-50" onClick={() => setOpen((prev) => !prev)}>
          <div className="w-8 h-1 bg-primary2 rounded"></div>          
          <div className="w-8 h-1 bg-primary2 rounded"></div>
          <div className="w-8 h-1 bg-primary2 rounded"></div>
        </button>
        {/* menu list */}
        {open &&(
        <div className="absolute top-14 lg:top-12 lg:w-1/4 right-0 w-screen max-h-full h-full
       bg-primary1 text-primary2 text-2xl z-50 flex flex-col gap-0 pl-3">
          {links.map((link)=>(
            <Link href={link.url} key={link.title} className="border-b-2 border-white py-2">{link.title}</Link>
          ))}
        </div>
        )}

        <div className="relative object-contain m-2"><Image src="/user-icon.png" width={30} height={30} alt=""/></div>
      </div>        
    </div>
  )
}

export default Navbar