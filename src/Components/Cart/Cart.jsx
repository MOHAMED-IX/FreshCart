import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../CartProduct/CartProduct'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { render } from 'react-dom'

export default function Cart() {

  const [cart, setCart] = useState(null)

  useEffect(() => {
    getUserCart()
  }, [])

  const [isLoading, setIsLoading] = useState(true)

  async function getUserCart() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).finally(() => {
      setIsLoading(false)
    })
    // console.log(data);
    setCart(data);
  }


  function clearCart() {
    setIsLoading(true)
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).finally(() => {
      setCart(null)
      setIsLoading(false)
    })
  }


  return (

    isLoading ? <LoadingScreen /> :

      cart ? <div className="pt-20">
        <div><Helmet><title>Cart</title></Helmet></div>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart?.data.products.map((product, index) => {
              return <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
            })}

          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$0</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <Link to={'/shippingAddress/' + cart?.data._id} className="block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
            <button onClick={clearCart} className='block text-center mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-600'>Clear Cart</button>
          </div>
        </div>
      </div>
      : 
      <>
        <div><Helmet><title>Cart</title></Helmet></div>
        <h1 className="mb-10 text-center text-2xl font-bold">Your cart is empty </h1>
      </>
  )

}
