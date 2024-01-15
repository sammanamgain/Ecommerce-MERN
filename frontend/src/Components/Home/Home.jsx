import React from "react";
import { CgMouse } from "react-icons/cg";
import {Link} from "react-router-dom"
import "./Home.css";
import Product  from "./Product";
export default function Home() {
  const product = {
    name: "shirt",
    price: "10000",
    _id: "samman",
    images: [{ url: "https://i2.wp.com/www.marknepal.com/wp-content/uploads/2019/09/IMG-6bd6b5be52c5c7cdc20af3b0ff60099f-V.jpg?fit=1280%2C1280&ssl=1" }]
  };
  return (
    <>
      <div className='banner'>
        <p className='text-2xl'> Welcome to Ecommerce</p>
        <h1> FIND AMAZING PROUDCTS BELOW</h1>
        <Link
          to=''
          className='flex text-black custom border-2 rounded-2xl p-2 border-black bg-white hover:bg-inherit'
        >
          <button className=''> Scroll</button>
          <CgMouse className='mt-1' />
        </Link>
      </div>
      <div className='flex justify-center items-center py-2  w-30 border-b-lime-600 '>
        <h1 className=' font-mono text-2xl border-b-4'> Featured Products</h1>
      </div>
      <div>
        <Product product={product} />
      </div>
    </>
  );
}
