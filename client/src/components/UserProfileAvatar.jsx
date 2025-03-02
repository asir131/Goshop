import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import {updateAvatar} from '../store/userSlice'
import { MdCancel } from "react-icons/md";
const UserProfileAvatar = ({close}) => {
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const handleUploadImage=async(e) =>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar',file)
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })
            const {data:responseData} = response
            dispatch(updateAvatar(responseData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
        
        
        
    }
  return (
    
    <section className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-neutral-700 opacity-60'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button className='block ml-auto' onClick={close}><MdCancel size={26} /></button>
                <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-2xl'>
                          {
                            user.avatar?(
                                <img src={user.avatar} alt={user.name}
                                className="w-full h-full"/>
                            ):(<FaRegUser size={60}/>)
                          }
                     
                </div>
                <form onSubmit={(e)=>e.preventDefault()} action="">

                    <label htmlFor="uploadProfile"><div className='border px-3 py-1 my-3 mx-1 rounded text-sm cursor-pointer'>
                        
                        {
                            loading ? "Loading..." : "Upload"
                        }
                        </div>
                        </label>

                    <input onChange={handleUploadImage} className='hidden' type="file" id='uploadProfile'/>
                </form>
                
            </div>
    </section>
  )
}

export default UserProfileAvatar