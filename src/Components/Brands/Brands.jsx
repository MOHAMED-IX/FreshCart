import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Brands() {

  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getBrands()
  }, [])

  async function getBrands() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')

    setBrands(data.data)
    // console.log(data.data);
    setIsLoading(false)

  }



  return <>
    <div>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <h1 className="text-center my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Our <mark className="px-2 text-white bg-green-600 rounded">Brands</mark></h1>

      {isLoading ? <LoadingScreen />
        :
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10 py-4 gap-x-3 gap-y-8'>

          {brands.map((brand, index) => {
            return <div key={index} className="max-w-sm overflow-hidden rounded-lg mx-auto h-auto shadow-none transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400">
              <img className="w-full" src={brand.image} alt={brand.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center text-green-500">{brand.name}</div>
              </div>
            </div>
          })}

        </div>}

    </div>
  </>
}
