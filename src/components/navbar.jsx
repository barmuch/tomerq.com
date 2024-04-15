"use client"

import Link from "next/link"
import Image from "next/image"
import React, { useState, useRef, useEffect } from 'react';

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/kurikulum", title: "Kurikulum" },
  { url: "/berita", title: "Berita"},
  { url: "/forum", title: "Forum" }
]

const Navbar = () => {
  const [openMenu, setOpenmenu] = useState(false)
  const [openUser, setOpenuser] = useState(false)

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Memeriksa apakah elemen yang diklik berada di luar tombol dan kontainer
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenmenu(false);
      setOpenuser(false);
    }
  };

  return (
    <div className="flex justify-between px-6 sm:px-8 p-1 md:px-12 lg:px-16 xl:px-32 h-full justify-center items-center" ref={containerRef}>
      {/* Logo Start */}
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
            <Link href="/">tomerQ.com</Link>        
      </div>
      {/* Navbar */}
      <div className="flex flex-row items-center gap-3">
        {/* lg:Menu Button */}
        <div className={`menu text-xl md:text-2xl lg:text-3xl hidden p-1 lg:block cursor-pointer ${openMenu ? 'bg-primary2 text-primary1' : ''}`} onClick={() => setOpenmenu(() => {
          if(openMenu === false){
            setOpenmenu(true)
            setOpenuser(false)
          }else if(openMenu === true){
            setOpenmenu(false)
            
          }
          })}>menu</div>
        {/* sm:Menu Button */}
        <button className="lg:hidden relative w-8 h-6 flex flex-col justify-between z-50 cursor-pointer" onClick={() => setOpenmenu(() => {
          if(openMenu === false){
            setOpenmenu(true)
            setOpenuser(false)
          }else if(openMenu === true){
            setOpenmenu(false)
          }
          })}>
          <div className="w-8 h-1 bg-primary2 rounded"></div>          
          <div className="w-8 h-1 bg-primary2 rounded"></div>
          <div className="w-8 h-1 bg-primary2 rounded"></div>
        </button>
        {/* Menu List */}
        {openMenu &&(
        <div className=" absolute top-14 md:top-12 md:w-1/5 right-0 bottom-0 w-screen max-h-full lg:h-fit bg-primary1 text-primary2 text-2xl z-50 flex flex-col gap-0">
          {links.map((link)=>(
            <Link href={link.url} key={link.title} className="border-white py-2 hover:bg-primary2 hover:text-primary1 text-center">{link.title}</Link>
          ))}
        </div>
        )}
        {/* User Button */}
        <div className="relative object-contain m-2 cursor-pointer" onClick={() => setOpenuser(() => {
          if (openUser === false){
            setOpenuser(true)
            setOpenmenu(false)
          } else if (openUser === true){
            setOpenuser(false)
          }
          })}><Image src="/user-icon.png" width={30} height={30} alt=""/></div>
        {/* User Dashboard */}
        
        {openUser &&(
        <div className=" absolute top-14 lg:top-12 lg:w-1/4 right-0 w-screen max-h-full h-fit bg-primary1 text-primary2 text-2xl z-50 flex flex-col gap-0 pl-3 py-3 border-t-1">
          {/* dashboard items */}
          <div className="flex flex-col gap-4">
            <div className="">Nama      :</div>
            <div className="">Domisili  :</div>
            <div className="">Institusi :</div>
            <div className="text-center">Premium</div>
          </div>
        </div>
        )}
      </div> 
      {/* Navbar End */}
    </div>
  )
}

export default Navbar