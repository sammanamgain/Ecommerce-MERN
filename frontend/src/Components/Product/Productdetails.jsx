import React from "react";
import Carousel from "react-material-ui-carousel";
export default function Productdetails(product) {
  return (
    <>
      <div>
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, index) => (
                <img key={index} src={item.src}></img>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
