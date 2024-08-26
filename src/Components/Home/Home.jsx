import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Helmet } from 'react-helmet'

export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // console.log(data.data);
    setProducts(data.data)
    setIsLoading(false)

  }


  return <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    {isLoading ? <LoadingScreen />
      :
      <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 py-4 gap-3'>

        {products.map((product, index) => {
          return <Product key={index} product={product} />
        })}

      </div>}
  </>
}
