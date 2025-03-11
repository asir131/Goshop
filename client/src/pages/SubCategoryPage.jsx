import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect } from 'react'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'


const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] =useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
    _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)


  const fetchSubCategory = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const {data : responseData} = response

      if(responseData.success){
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

const column = [
  columnHelper.accessor('name',{
    header : "Name",
  }),
  columnHelper.accessor('image',{
    header : "Image",
    cell : ({row})=>{
      return <div className='flex justify-center'>
        <img 
        src={row.original.image} 
        alt={row.original.name}
       className='w-8 h-8 cursor-pointer' onClick={()=>{
        setImageURL(row.original.image)
       }}/>
      </div>
    }
  }),
  columnHelper.accessor('category',{
    header : "Category",
    cell : ({row})=>{
      return (
        <>
          {
            row.original.category.map((c,index)=>{
              return (
                <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
              )
            })
          }
        </>
      )
    }
  }),
  columnHelper.accessor("_id",{
    header : "Action",
    cell : ({row})=>{
      return (
        <div className='flex items-center justify-center gap-3'>
          <button className='p-2 bg-green-100 rounded-2xl hover:text-green-400'>
          <MdEdit onClick={()=>{setOpenEdit(true)
            setEditData(row.original)}
          } size={20}/>

          </button>
          <button className='p-2 bg-red-100 rounded-2xl  hover:text-red-400'>
          <MdDeleteForever  size={20} onClick={()=>{
            setOpenDeleteConfirmBox(true)
            setDeleteSubCategory(row.original)
          }
          }/>

          </button>
        </div>
      )
    }
  })

]
const handleDeleteSubCategory = async()=>{
  try {
      const response = await Axios({
          ...SummaryApi.deleteSubCategory,
          data : deleteSubCategory
      })

      const { data : responseData } = response

      if(responseData.success){
         toast.success(responseData.message)
         fetchSubCategory()
         setOpenDeleteConfirmBox(false)
         setDeleteSubCategory({_id : ""})
      }
  } catch (error) {
    AxiosToastError(error)
  }
}
  return (
    <section>
        <div className='p-2  bg-white shadow-2xl flex items-center justify-between'>
            <h2 className='font-bold'>Sub Category</h2>
            <button  className='text-sm border border-amber-400 hover:bg-amber-400 hover:text-white px-2 rounded py-1' onClick={()=>setOpenAddSubCategory(true)}>Add Sub Category</button>
        </div>

        <div className='overflow-auto w-full max-w-[95vw]'>
          <DisplayTable
          data={data}
          column={column}/>
        </div>

        {
          openAddSubCategory && (
            <UploadSubCategoryModel fetchData={fetchSubCategory} close={()=>setOpenAddSubCategory(false)}/>
          )
        }
        { imageURL&&(<ViewImage url={imageURL} close={()=>setImageURL("")}/>)
          
        }
        {
          openEdit &&
          <EditSubCategory data={editData} close={()=>setOpenEdit(false)}
          fetchData={fetchSubCategory}/>
        }
        {
          openDeleteConfirmBox && (
            <ConfirmBox cancel={()=>setOpenDeleteConfirmBox(false)} confirm={handleDeleteSubCategory} close={()=>setOpenDeleteConfirmBox(false)}/>
          )
        }
      </section>
  )
}

export default SubCategoryPage