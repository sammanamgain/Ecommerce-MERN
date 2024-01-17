import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productactions";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

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

  return (
    <>
      {!loading ? (
        <div>
          <div>
            <Carousel>
              {products &&
                products.images.map((item, index) => (
                  <img key={index} src={item.url} alt={`Product ${index}`} />
                ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
