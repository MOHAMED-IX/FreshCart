import React from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { addProductToCart } from '../../Contexts/cartService';

export default function RelatedProducts({ relatedProducts }) {

  var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4
    
  };

  return (
    <div className="lg:mt-40 md:mt-30 sm:mt-20">
      <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>

        <Slider {...settings}>
          {relatedProducts?.map((relatedProduct, index) => {
            return <div key={index} className="w-full max-w-sm mx-auto rounded-md p-2 overflow-hidden mt-10 mb-5">
            <div className=' shadow-md'>
            <div className="flex items-end justify-end h-56 w-full bg-cover bg-center" style={{ "backgroundImage": "url(" + relatedProduct.imageCover + ")" }}>
              <button onClick={() => addProductToCart(relatedProduct._id)} className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </button>
            </div>
            <div className="px-5 py-3">
              <Link to={"/productDetails/" + relatedProduct._id}>
              <h3 className="text-gray-700 uppercase line-clamp-1">{relatedProduct.title}</h3>
              </Link>
              <span className="mt-2 text-green-500">${relatedProduct.price}</span>
            </div>
            </div>
          </div>
          })}
        </Slider>
    </div>
  )
}
