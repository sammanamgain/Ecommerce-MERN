import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productactions";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "../Loader/Loader";
import "./Productdetails.css";

export default function Productdetails() {
  //let [loading1, setloading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect ran");
    dispatch(getProductDetails(id));
  }, []);

  let { loading, products, error } = useSelector(
    (state) => state.productDetails
  );

  console.log("printing the state");
  console.log(loading, products, error);
  if (loading === undefined) {
    loading = true;
  }
  console.log(loading);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20 : 25,

    activeColor: "tomato",
    value: products ? products.ratings : 0,
    isHalf: true,
  };
  return (
    <>
      {!loading ? (
        <div className='product'>
          <Carousel className='carousel'>
            {products &&
              products.images.map((item, index) => (
                <img
                  className='productimage'
                  key={index}
                  src={item.url}
                  alt={`Product ${index}`}
                />
              ))}
          </Carousel>
          <div className='detail'>
            <div className='id'>
              <h1>Subscribe</h1>
              <p>product #{products._id}</p>
            </div>

            <hr></hr>
            <div className='flex items-center justify-center '>
              <ReactStars {...options}></ReactStars>
              <span>({products.numofReviews})</span>
            </div>
            <hr></hr>

            <p>Rs.{products.price}</p>
            <div className='addtocart'>
              <button>-</button>
              <input type='Number' value={1}></input>
              <button>+</button>
              <span>Add to Cart</span>
            </div>
            <hr></hr>
            <h1>Description</h1>
            <p>{products.description}</p>
            <p className={products.stock<1 ?"finished" :"Notfinished"}>
              Status:<b>{products.Stock < 1 ? "OutOfStock" : "InStock"}</b>
            </p>

            <button className="submitbutton">Submit Review</button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
