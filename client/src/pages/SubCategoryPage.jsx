import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] =useState(false)
  return (
    <section>
        <div className='p-2  bg-white shadow-2xl flex items-center justify-between'>
            <h2 className='font-bold'>Sub Category</h2>
            <button  className='text-sm border border-amber-400 hover:bg-amber-400 hover:text-white px-2 rounded py-1' onClick={()=>setOpenAddSubCategory(true)}>Add Sub Category</button>
        </div>

        {
          openAddSubCategory && (
            <UploadSubCategoryModel close={()=>setOpenAddSubCategory(false)}/>
          )
        }
      </section>
  )
}

export default SubCategoryPage