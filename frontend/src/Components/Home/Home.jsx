import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./Home.css";
import Product from "./Product";
import Metadata from "../layout/Header/Metadata";
import { getProduct } from "../../actions/productactions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert"
export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch,error]);


  useAlert
  return (
    <>
      {" "}
      {loading ? (
        
          
          <Loader></Loader>
        
      ) : (
        <>
          <Metadata title='samman'></Metadata>
          <div className='banner '>
            <p className='text-2xl'> Welcome to Ecommerce</p>
            <h1> FIND AMAZING PROUDCTS BELOW</h1>
            <a
              href='#Featured'
              className='flex text-black custom border-2 rounded-2xl p-2 border-black bg-white hover:bg-inherit'
            >
              <button className=''> Scroll</button>
              <CgMouse className='mt-1' />
            </a>
          </div>
          <div id='Featured' className='mt-10 pt-10'>
            <div className='flex justify-center items-center py-2  w-30 border-b-lime-600 '>
              <h1 className=' font-mono text-2xl border-b-4'>
                {" "}
                Featured Products
              </h1>
            </div>
            <div
              className='flex md:flex-row flex-col items-center justify-center md:items-start md:justify-start flex-wrap md:ml-20 '
              id='Homeproduct'
            >
              {product &&
                product.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
