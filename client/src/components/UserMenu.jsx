import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'

import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'


const UserMenu = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleLogout =async () => {
      try {
        const response = await Axios({
          ...SummaryApi.logout
        })
        if(response.data.success){
          dispatch(logout)
          localStorage.clear()
          toast.success(response.data.message)
        }
      } catch (error) {
        console.log(error);
        
        
      }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm'>{user.name ||user.mobile}</div>
        <Divider/>
        <div className='text-sm grid gap-2'>
            <Link to={""}>My Orders</Link>
            <Link to={""}>Save Address</Link>
            <button onClick={handleLogout} className='text-left bg-red-400 p-2 rounded'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu