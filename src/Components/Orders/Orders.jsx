import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';

export default function Orders() {

  let { id } = useParams()
  // console.log(id);
  const userId = id

  const [orders, setOrders] = useState([])

  useEffect(() => {
    getUserOrders()
  }, [])


  async function getUserOrders() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + userId , {
      params: { url: "http://localhost:5173" }
    })
    setOrders(data)
    console.log(data);  
    }

  return (
    <div>
      orders
    </div>
  )
}

