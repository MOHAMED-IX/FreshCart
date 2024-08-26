import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Categories() {

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

    setCategories(data.data)
    setIsLoading(false)
    console.log(data.data);
  }



  return <>
    <div>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <h1 className="text-center my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Our <mark className="px-2 text-white bg-green-600 rounded">Categories</mark></h1>

      {isLoading ? <LoadingScreen />
      :
      <div className='container mx-auto'>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10 p-4 gap-8'>

          {categories.map((category, index) => {
            return<div key={index} class="relative overflow-hidden h-80 rounded-3xl text-2xl font-bold ">
            <div class="z-10 absolute w-full h-full peer "></div>
            <div class="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-green-600 transition-all duration-500"></div>
            <div class="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-green-600 transition-all duration-500">
              <p className='text-white'>{category.name}</p>
            </div>
            <div class="w-full h-full items-center justify-center flex uppercase">
              <img src={category.image} alt={category.name}/>
            </div>
          </div>
          })}

        </div>
      </div>}

    </div>
    </>
}
