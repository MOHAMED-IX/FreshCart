import React from 'react'
import Slider from "react-slick";
import ProductDetails from '../ProductDetails/ProductDetails';

export default function ProductImageSlider({ images }) {

  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images?.map((image, index) => {
        return <div>
          <img key={index} className="h-full w-full rounded-md object-fit max-w-xs mx-auto" src={image} alt={ProductDetails?.title} />
        </div>
      })}
    </Slider>
  )
}
