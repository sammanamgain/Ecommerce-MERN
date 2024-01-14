import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { ReactNavbar } from "overlay-navbar";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
//import logo from "../../../images/logo.png";
import clsx from 'clsx'

const Header = () => {
  const [sidemenu, setsidemenu] = useState(false);
  return (
    <main>
      <nav className='flex justify-between px-8 items-center py-6 lg:px-24'>
        <div className="flex items-center gap-8 ">
        <section className='flex items-center gap-4'>
          <GiHamburgerMenu className='text-3xl cursor-pointer lg:hidden' onClick={()=>setsidemenu(true)}></GiHamburgerMenu>
          <Link className='text-4xl font-mono'>Logo</Link>
          </section>
          <Link className='text-grey-400 hover:text-black hidden lg:block'> Collections</Link>
          <Link className='text-grey-400 hover:text-black hidden lg:block '> Collections</Link>
          </div>
        <div className={clsx("fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",sidemenu &&"translate-x-0" )}>
          <section className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex'>
            <IoCloseSharp className='mt-0 mb-8 text-3xl cursor-pointer' onClick={()=>setsidemenu(false)}></IoCloseSharp>
            <Link className='font-bold '> Collections</Link>
            <Link className='font-bold '> Collections</Link>
            <Link className='font-bold '> Collections</Link>
            <Link className='font-bold '> Collections</Link>{" "}
            <Link className='font-bold '> Collections</Link>
          </section>
        </div>
        <section className='flex items-center gap-4'>
          <FaCartShopping className='text-3xl'>"</FaCartShopping>
          <img
            width={40}
            height={40}
            className='h-8 w-8 rounded-full'
            src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
            alt='profileimage'
          ></img>
        </section>
      </nav>
      <hr className="lg:mx-24"/>
    </main>
  );
};

export default Header;
