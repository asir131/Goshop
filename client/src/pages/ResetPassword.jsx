import React, { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";



const ResetPassword = () => {
    const [showPassword,setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : "",
    })
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    useEffect(() =>{
        if (!(location?.state?.data?.success)){
            navigate("/")
        }
        if(location?.state?.email){
            setData((preve)=>{
                return {
                    ...preve,
                    email : location?.state?.email
                }
            })
        }
    },[])

    console.log("data reset password",data);
    
    const handleChange=(e)=>{
        const {name,value}=e.target

        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.newPassword!==data.confirmPassword){
            toast.error("passwords are not same")
        }
      try {
        const response = await Axios({
            ...SummaryApi.resetPassword,
            data: data
           })
           if(response.data.error){
            toast.error(response.data.message)
           }
           if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
              
                email : "",
        newPassword : "",
        confirmPassword : "",
                
               })

               
           }
           
           console.log("res",response);
      } catch (error) {
        AxiosToastError(error)
        
      }

       
       

    }
   

  return (
    <section className=' w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded-2xl p-4'>
            <p className='font-bold'>Enter your new password</p>

            <form action="" className='grid gap-2 mt-4' onSubmit={handleSubmit}>
               
                <div className='grid gap-1'>
                    <label htmlFor="newPassword">New Password</label>
                    <div className='grid gap-1 '>
                                        
                                        <div className='flex bg-blue-50 p-2 border rounded-xl'>
                                            <input type={showPassword? "text":"password"}
                                            id='password'
                                            className='w-full outline-0'
                                            name="newPassword"
                                            value={data.newPassword}
                                            onChange={handleChange}/>
                                        <div className='cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                                            <FaEye />
                    
                                        </div>
                                        </div>
                                        
                                    </div>
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='grid gap-1 '>
                                        
                                        <div className='flex bg-blue-50 p-2 border rounded-xl'>
                                            <input type={showConfirmPassword? "text":"password"}
                                            id='password'
                                            className='w-full outline-0'
                                            name="confirmPassword"
                                            value={data.confirmPassword}
                                            onChange={handleChange}/>
                                        <div className='cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                            <FaEye />
                    
                                        </div>
                                        </div>
                                        
                                    </div>
                </div>
                
                <button className='bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold my-2 text-white tracking-wide'>Change password</button>
            </form>
            <p>
                Already have an account? <Link to={'/login'}className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
        </div>
        
    </section>
  )
}

export default ResetPassword