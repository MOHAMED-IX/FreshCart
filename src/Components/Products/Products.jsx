import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import Product from '../Product/Product'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Products() {

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    
  })



  return <>
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? <LoadingScreen />
        :
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 py-4 gap-3'>
          {data?.data.data.map((product, index) => {
            return <Product key={index} product={product} />
          })}
        </div>}
    </div>
  </>
}
