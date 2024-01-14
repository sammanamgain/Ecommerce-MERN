import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
export default function Home() {
  return (
    <div className='banner'>
      <p className='text-2xl'> Welcome to Ecommerce</p>
      <h1> FIND AMAZING PROUDCTS BELOW</h1>
      <a href='' className='flex text-black '>
        <button className='text-1xl'> Scroll</button>
        <CgMouse className='text-3xl' />
      </a>
    </div>
  );
}
