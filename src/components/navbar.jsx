"use client"

import Link from "next/link"
import Image from "next/image"
import React, { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/kurikulum", title: "Kurikulum" },
  { url: "/maintenance", title: "Berita"},
  { url: "/maintenance", title: "Forum" }
]

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { data: session, status } = useSession();
  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenMenu(false);
      setOpenUser(false);
    }
  };

  const toggleMenu = () => {
    setOpenMenu((prevState) => !prevState);
    setOpenUser(false);
  };

  const toggleUser = () => {
    setOpenUser((prevState) => !prevState);
    setOpenMenu(false);
  };
  return (
    <div className="flex justify-between px-6 sm:px-8 p-1 md:px-12 lg:px-16 xl:px-32 h-full justify-center items-center" ref={containerRef}>
      {/* Logo Start */}
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
        <Link href="/">tomerQ.com</Link>
      </div>
      {/* Navbar */}
      <div className="flex flex-row items-center gap-3">
        {/* Menu Button */}
        <div className={`menu text-xl md:text-2xl lg:text-3xl hidden p-1 lg:block cursor-pointer ${openMenu ? 'bg-primary2 text-primary1' : ''}`} onClick={toggleMenu}>
          menu
        </div>
        {/* Smaller Menu Button */}
        <button className="lg:hidden relative w-8 h-6 flex flex-col justify-between z-50 cursor-pointer" onClick={toggleMenu}>
          <div className="w-8 h-1 bg-primary2 rounded"></div>
          <div className="w-8 h-1 bg-primary2 rounded"></div>
          <div className="w-8 h-1 bg-primary2 rounded"></div>
        </button>
        {/* Menu List */}
        {openMenu && (
          <div className="absolute top-12 md:top-12 md:w-1/5 right-0 bottom-0 w-screen max-h-full lg:h-fit bg-primary1 text-primary2 text-2xl z-50 flex flex-col gap-0">
            {links.map((link) => (
              <Link href={link.url} key={link.title} className="border-white py-2 hover:bg-primary2 hover:text-primary1 text-center">{link.title}</Link>
            ))}
          </div>
        )}
        {/* User Button */}
        <div className="relative object-contain cursor-pointer" onClick={toggleUser}>
        {status === 'authenticated' ? (
          <Image src={session.user.image} width={30} height={30} alt="User Image" className="rounded-full" />
        ) : (
          <Image src="/user-icon.png" width={30} height={30} alt="Default User Icon" />
        )}
        </div>
        {/* User Dashboard */}
        {openUser && (

          <div className="absolute top-14 lg:top-12 lg:w-1/4 right-0 w-screen max-h-full h-fit bg-primary1 text-primary2 text-2xl z-50 flex flex-col gap-0 pl-3 py-3 border-t-1">
            {/* dashboard items */}
            {status === "authenticated" ? (
              <div className="flex flex-col gap-4">
                <div className="text-center">{session.user.name}</div> 
                <div className="text-center">{session.user.email}</div> 
                <div className="text-center cursor-pointer bg-primary2 text-primary1 my-1 rounded-lg hover:bg-hover1" onClick={signOut}>logout</div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <Link href="/login" className="hover:bg-primary2 hover:text-primary1 text-center ">Login</Link>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Navbar End */}
    </div>
  );
}

export default Navbar;
