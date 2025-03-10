import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import UserProfileAvatar from '../components/UserProfileAvatar';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
const Profile = () => {
    const user = useSelector(state=>state.user)
    const [openProfileEdit,setProfileEdit]= useState(false)
    const dispatch = useDispatch()
    const [userData,setUserData]= useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile

    })
  const [loading,setLoading] = useState(false)
    useEffect(() => {
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile
        })
    },[user])
    const handleOnChange =(e) => {
        const {name,value} = e.target

        setUserData((preve) => {
            return {
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response =await Axios({
                    ...SummaryApi.updateUserDetails,
                    data: userData
            })
            const {data:responseData} = response
            if(responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
    
                dispatch(setUserDetails(userData.data))
                
            }
        } catch (error) {
            AxiosToastError(error)
        }finally {setLoading(false)}

    }
  return (
    <div className='p-4'>
        {/* profile upload and display image */}
        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-2xl'>
          {
            user.avatar?(
                <img src={user.avatar} alt={user.name}
                className="w-full h-full"/>
            ):(<FaRegUser size={60}/>)
          }

        </div>
        <button className='text-sm min-w-20 border px-3 py-1 rounded mt-4 hover:border-amber-400 cursor-pointer' onClick={()=>setProfileEdit(true)}>Change Profile</button>


          {
            openProfileEdit && (
                <UserProfileAvatar close={()=>setProfileEdit(false)}/>
            )
          }

          {/* name,mobile,email,changepass */}

          <form className='my-4' action="" onSubmit={handleSubmit}>
            <div className='grid'>
                <label htmlFor="name">Name</label>
                <input type="text"
                id='name'
                placeholder='Enter your name' 
                className='p-2 outline-none border focus-within:border-amber-400 rounded'
                value={userData.name}
                name='name'
                required
                onChange={handleOnChange}/>
            </div>
            <div className='grid'>
                <label htmlFor="mobile">Mobile</label>
                <input type="text"
                id='mobile'
                placeholder='Enter your mobile number' 
                className='p-2 outline-none border focus-within:border-amber-400 rounded'
                value={userData.mobile}
                name='mobile'
                
                onChange={handleOnChange}/>
            </div>
            <div className='grid'>
                <label htmlFor="email">Email</label>
                <input type="text"
                id='email'
                placeholder='Enter your mobile number' 
                className='p-2 outline-none border focus-within:border-amber-400 rounded'
                value={userData.email}
                name='email'
                required
                onChange={handleOnChange}/>
            </div>
            <button className='border w-full px-4 py-2 hover:bg-amber-400 rounded mt-2'>

                {
                    loading?"Loading...":"Submit"
                }
            </button>
          </form>

    </div>
  )
}

export default Profile