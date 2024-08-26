import React from 'react'
import { Mosaic } from 'react-loading-indicators'

export default function LoadingScreen() {
  return (
    <div className='min-h-96 flex justify-center items-center my-12'>
      <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
    </div>
  )
}
