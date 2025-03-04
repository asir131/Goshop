import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img src={noDataImage} alt="no data" 
        className='w-75 h-80' />
        <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData