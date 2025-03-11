
import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";

const UploadSubCategoryModel = ({close,fetchData}) => {
    const [data,setData]= useState({
        name : "",
        image : "",
        category : []
      })
    
      const allCategory = useSelector(state=>state.product.allCategory)
      const [loading,setLoading] = useState(false)
    const handleOnChange = (e) => {
      const {name,value} = e.target
    
      setData((preve)=>{
        return{
          ...preve,
          [name]: value
        }
      })
      
    }
    const handleSubmit=async(e)=>{
      e.preventDefault()
    
      try {
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.createSubCategory,
            data : data
        })
        const {data:responseData} = response
    
        if(responseData.success) {
          toast.success(responseData.message)
          fetchData()
          close()
        }
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setLoading(false)
      }
    }
    
    const handleUploadCategoryImage = async(e) => {
      const file = e.target.files[0]
    
      if(!file){
        return
      }
      setLoading(true)
      const response = await uploadImage(file)
      setLoading(false)
      const {data : ImageResponse} = response
      setData((preve) => {
          return{
            ...preve,
            image : ImageResponse.data.url
          }
      })
      
      
      
      
    }

    const handleRemoveCatSelected = (catID) => {
        const index = data.category.findIndex(el=> el._id === catID)

         data.category.splice(index, 1)
         setData((preve)=>{
            return {
                ...preve
            }
         })
    }
    
  return (
    <section className='fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center'>
    
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                  <h1 className='font-semibold'>Sub Category</h1>
                      <button onClick={()=>close()} className='block ml-auto'>
                        <IoClose size={25}/>
                      </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleSubmit} action="">
                  <div className='grid gap-1'>
                    <label id='categoryName' htmlFor="name">Name</label>
                    <input id='name' type="text" 
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
                          ${!data.name? "bg-gray-400" : "border border-amber-400 hover:bg-amber-400"} px-4 py-1 rounded cursor pointer`}>
                            {loading ? "Loading..." : "Upload Image"}
                            </div>
                          <input disabled={!data.name} onChange={  handleUploadCategoryImage } type="file" id='uploadCategoryImage'
                          className='hidden'/>
    
                      </label>
    
                      
                    </div>
                  </div>


                  {/* <div className='grid gap-1'>
                    <label htmlFor="">Select Category</label>

                    <select className='bg-blue-50 border p-3 rounded-xl'>
                        <option value={""}>Select Category</option>
                    </select>
                  </div> */}
                  

                  <div className='grid gap-1'>
                      <label htmlFor="">Select Category</label>
                      <div className='border focus-within:border-amber-400'>
                    {/* display value  */}
                    <div className='flex flex-wrap gap-2'>
                        {
                            data.category.map((cat,index) => {
                                return(
                                <p className='bg-white shadow-md px-1 m-1 flex items-center gap-2' key={cat._id+"selectedValue "}>
                                    
                                    {cat.name}
                                    <div className='cursor-pointer' onClick={()=>handleRemoveCatSelected(cat._id)}><IoIosCloseCircle />
                                    </div>
                                    </p>
                                )
                            })
                        }
                    </div>

                    {/* select category  */}

                    <select onChange={(e)=>{
                        const value = e.target.value
                        const categoryDetails=allCategory.find(el=>el._id==value)
                            setData((preve)=>{
                                return {
                                    ...preve,
                                    category : [...preve.category, categoryDetails]
                                }
                            })
                        
                    }} className='w-full p-2 bg-transparent outline-none border' name="" id="">
                        <option value="" >Select Category</option>
                        {
                            allCategory.map((category,index) => {
                                return (
                                    <option key={category._id+"subCategory"} value={category._id}>{category?.name}</option>
                                )
                            })
                        }
                    </select>
                  </div>
                    </div>          

                  <button
                      className={
                        `${data.name && data.image && data.category[0]? "bg-amber-400 hover:bg-amber-300" : "bg-slate-200"}  py-2 rounded font-semibold`
                      }>
                        Add Sub Category
                        </button>
                      
                </form>
    
            </div>
        </section>
  )
}

export default UploadSubCategoryModel