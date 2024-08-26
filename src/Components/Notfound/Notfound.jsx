import React from 'react'
import error from '../../assets/images/error.svg'

export default function Notfound() {
  return (
    <div className='w-full flex items-center justify-center'>
      <img src={error} alt="error" />
    </div>
  )
}
