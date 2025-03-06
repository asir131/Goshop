import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
const EditCategory = ({close,fetchData,data:CategoryData}) => {

    const [data,setData]= useState({
      _id : CategoryData._id,
      name : CategoryData.name,
      image : CategoryData.image,
    })
  
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
          ...SummaryApi.updateCategory,
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
    const {data : ImageResponse} = response
    setLoading(false)
    setData((preve) => {
        return{
          ...preve,
          image : ImageResponse.data.url
        }
    })
    console.log(Image);
    
    
    
  }
  return (
   <section className='fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center'>
   
           <div className='bg-white max-w-4xl w-full p-4 rounded'>
               <div className='flex items-center justify-between'>
                 <h1 className='font-semibold'>Update Category</h1>
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
                         ${!data.name? "bg-gray-400" : "border border-amber-400 hover:bg-amber-400"} px-4 py-1 rounded cursor pointer`}>
                          {
                            loading ? "Loading..." : "Upload Image"
                          }
                          </div>
                         <input disabled={!data.name} onChange={  handleUploadCategoryImage } type="file" id='uploadCategoryImage'
                         className='hidden'/>
   
                     </label>
   
                     
                   </div>
                 </div>
                 <button
                     className={
                       `${data.name && data.image ? "bg-amber-400 hover:bg-amber-300" : "bg-slate-200"}  py-2 rounded font-semibold`
                     }>
                       Update Category
                       </button>
                     
               </form>
   
           </div>
       </section>
  )
}

export default EditCategory