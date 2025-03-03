import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';

const UploadCategoryModel = ({close}) => {
  const [data,setData]= useState({
    name : "",
    image : "",
  })
const handleOnChange = (e) => {
  const {name,value} = e.target

  setData((preve)=>{
    return{
      ...preve,
      [name]: value
    }
  })
  
}
const handleSubmit=(e)=>{
  e.preventDefault()
}

const handleUploadCategoryImage = async(e) => {
  const file = e.target.files[0]

  if(!file){
    return
  }
  
  const response = await uploadImage(file)
  const {data : ImageResponse} = response
  setData((preve) => {
      return{
        ...preve,
        image : ImageResponse.data.url
      }
  })
  console.log(Image);
  
  
}
  return (
    <section className='fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800 opacity-60 flex items-center justify-center'>

        <div className='bg-white max-w-4xl w-full p-4 rounded'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold'>Category</h1>
                  <button onClick={()=>close()} className='block ml-auto'>
                    <IoClose size={25}/>
                  </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmit} action="">
              <div className='grid gap-1'>
                <label id='categoryName' htmlFor="">Name</label>
                <input id='categoryName' type="text" 
                placeholder='Enter category name'
                value={data.name}
                name='name'
                onChange={handleOnChange}
                className='bg-blue-50 p-2 border border-blue-100 focus-within:border-amber-400 outline-none rounded'/>
              </div>
              <div className='grid gap-1'>
                <p>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                  <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center'>
                    {
                      data.image ? (
                          <img src={data.image} alt="category" 
                          className='w-full h-full object-scale-down'/>
                      ):(
                        <span>no image</span>
                      )
                      
                    }
                  </div>
                  <label htmlFor="uploadCategoryImage">
                    <div  className={`
                      ${!data.name? "bg-gray-400" : "bg-amber-400"} px-4 py-1 rounded cursor pointer`}>Upload Image</div>
                      <input disabled={!data.name} onChange={  handleUploadCategoryImage } type="file" id='uploadCategoryImage'
                      className='hidden'/>

                  </label>
                  
                </div>
              </div>

            </form>

        </div>
    </section>
  )
}

export default UploadCategoryModel