import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20 : 25,

    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link
      to={`product/${product._id}`}
      className='mb-10 md:px-8 w-[60vw] md:w-[38vw] lg:w-[18vw] flex flex-col justify-center items-start text-[rbg(68,68,68)] m-[2vmax] p-b-[2vh]  transition-all hover:shadow-xl hover:shadow-slate-200 hover:origin-top hover:-translate-y-3'
    >
      <img
        className='h-[200px] bg-cover overflow-hidden '
        src={product.images[0].url}
      ></img>
      <p className='py-1 text-3xl font-sans'> {product.name}</p>
      <p>{product.description}</p>
      <div className='flex items-center justify-center '>
        <ReactStars {...options}></ReactStars>
        <span>({product.numofReviews})</span>
      </div>
      <span className='py-1 text-red-500'>RS.{product.price}</span>
    </Link>
  );
}
