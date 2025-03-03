import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
 import { useNavigate } from 'react-router-dom'
 import { GoLinkExternal } from "react-icons/go";



const UserMenu = ({close}) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const handleLogout =async () => {
      try {
        
        const response = await Axios({
          ...SummaryApi.logout
        })
        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
         
          toast.success(response.data.message)
          navigate("/")
        }
      } catch (error) {
        AxiosToastError(error);
        
        
      }
    }

    const handleClose = () => {
      if(close){
        close()
      }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-3'>{user.name ||user.mobile}
          <Link onClick={handleClose} to={"/dashboard/profile"}>
             <GoLinkExternal size={15} className='hover:text-amber-500'/>
          </Link>
        </div>
        <Divider/>
        <div className='text-sm grid gap-2'>

            

            <Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-yellow-500 rounded p-2'>Category</Link>

            <Link onClick={handleClose} to={"/dashboard/subcategory"} className='hover:bg-yellow-500 rounded p-2'>Sub Category</Link>

            <Link onClick={handleClose} to={"/dashboard/upload-product"} className='hover:bg-yellow-500 rounded p-2'>Upload Product</Link>

            <Link onClick={handleClose} to={"/dashboard/product"} className='hover:bg-yellow-500 rounded p-2'>Product</Link>

            <Link onClick={handleClose} to={"/dashboard/myorders"} className='hover:bg-yellow-500 rounded p-2'>My Orders</Link>

            <Link onClick={handleClose} to={"/dashboard/address"}className='hover:bg-yellow-500 rounded p-2'>Save Address</Link>

            <button onClick={handleLogout} className='text-left bg-red-400 hover:bg-red-500 p-2 rounded'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu