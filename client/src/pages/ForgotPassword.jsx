import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";
const ForgotPassword = () => {
    const [data,setData] = useState({
        
        email : "",
       
        
    })
    
     const navigate = useNavigate()
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


      try {
        const response = await Axios({
            ...SummaryApi.forgotPassword,
            data: data
           })
           if(response.data.error){
            toast.error(response.data.message)
           }
           if(response.data.success){
            toast.success(response.data.message)
            navigate("/verfication-otp",{
                state: data
               })
            setData({
              
                email : "",
                
                
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
            <p className='font-bold'>Forgot Password</p>

            <form action="" className='grid gap-2 mt-4' onSubmit={handleSubmit}>
               
                <div className='grid gap-1'>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    id='email'
                    className='bg-blue-50 p-2 border rounded-xl'
                    name="email"
                    value={data.email}
                    onChange={handleChange}/>
                </div>
                
                
                <button className='bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold my-2 text-white tracking-wide'>Send Otp</button>
            </form>
            <p>
                Already have an account? <Link to={'/login'}className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
        </div>
        
    </section>
  )
}

export default ForgotPassword
