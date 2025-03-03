import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'

const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory]=useState(false)
  return (
    <section>
        <div className='p-2  bg-white shadow-2xl flex items-center justify-between'>
            <h2 className='font-bold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-amber-400 hover:bg-amber-400 hover:text-white px-2 rounded py-1'>Add Category</button>
        </div>

        {
            openUploadCategory && (
                <UploadCategoryModel close={()=>setOpenUploadCategory(false)}/>
            )
        }
    </section>
  )
}

export default CategoryPage