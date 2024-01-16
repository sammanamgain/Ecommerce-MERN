import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productactions";
import { useParams } from "react-router-dom";
export default function Productdetails() {
  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();

  //console.log(products);
  useEffect(() => {
    console.log("use effect ran");
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const { products, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log("printing the state");
  console.log(products.messgae.images);

  return (
    <>
      <div>
        <div>
          <Carousel>
            {products.messgae.images &&
              products.messgae.images.map((item, index) => (
                <img key={index} src={item.url}></img>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
