import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoAppleAppstore } from "react-icons/io5";
import './Footer.css'
export default function Footer() {
  return (
    <div className='footer   w-full bg-black text-white flex  gap-2 lg:gap-10 lg:justify-around pt-5 pb-2 '>
      <div className="flex flex-col gap-2">
        <h1>Amgain Ecommerce</h1>
        <div className='flex gap-6'>
          <FaFacebook className='text-3xl' />
          <FaTwitter className='text-3xl' />
          <AiFillInstagram className='text-3xl' />
        </div>
      </div>
      <div className='flex flex-col font-semibold gap-2 w-80'>
        <p className="font-bold"> Lolang,kathmandu</p>
        <p className="w-full">phone No:9847289980</p>
        <p>amgain02@gmail.com</p>
      </div>
      <div className='flex flex-col font-bold '>
        <h1 className='text-slate-300'> Support</h1>
        <h3> ContactUs</h3>
        <h3> FAQ</h3>
        <h3> Downloads</h3>
        <h3> Product Registration</h3>
      </div>
      <div className='hidden md:block flex-col'>
        <h1 className='font-bold'>
          {" "}
          Downlaods Our App on Playstore and Appstore
        </h1>
        <p> Click to downlaod</p>
        <div className='flex gap-5'>
          <IoLogoGooglePlaystore />
          <IoLogoAppleAppstore />
        </div>
      </div>
    </div>
  );
}
