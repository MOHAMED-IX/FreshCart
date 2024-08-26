import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { addProductToCart } from '../../Contexts/cartService';


export default function ProductDetails() {

  let { id } = useParams()
  // console.log(id);

  const [ProductDetails, setProductDetails] = useState(null)
  const [relatedProducts , setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getProductDetails()
  }, [id])

  async function getProductDetails() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id)
    setProductDetails(data.data);
    getRelatedProducts(data.data?.category._id)
    setIsLoading(false)
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products'
      ,{
        params:{
          "category" : categoryId
        }
      }
    )
    setRelatedProducts(data.data)
    // console.log(data.data);
    
  }

  return <>

    {
      isLoading ? <LoadingScreen />
        :
        <div className='bg-white'>


          <main className="my-8">
            <div className="container mx-auto px-6">
              <div className="md:flex md:items-center">
                <div className="w-full md:w-1/2 lg:h-96">
                  <ProductImageSlider images={ProductDetails?.images} />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                  <h3 className="text-gray-700 uppercase text-lg">{ProductDetails?.title}</h3>
                  <span className="text-green-500 mt-3 font-bold">$ {ProductDetails?.price}</span>
                  <hr className="my-3" />


                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">Brand:</label>
                    <h3>{ProductDetails?.brand.name}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">Rating:</label>
                    <RatingStars rating={ProductDetails?.ratingsAverage ?? 0} />
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">Description:</label>
                    <h3>{ProductDetails?.description}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">Category:</label>
                    <h3>{ProductDetails?.category.name}</h3>
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm" htmlFor="count">Category:</label>
                    <h3>{ProductDetails?.subcategory[0].name}</h3>
                  </div>

                  <div className="flex items-center mt-6">
                    <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                    <button onClick={() => addProductToCart(ProductDetails._id)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                      <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              <RelatedProducts relatedProducts={relatedProducts} />

            </div>
          </main>
        </div>

    }

  </>
}

