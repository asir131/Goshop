import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";
const Login = () => {
    const [data,setData] = useState({
        
        email : "",
        password : "",
        
    })
    const [showPassword,setShowPassword] = useState(false)
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
            ...SummaryApi.login,
            data: data
           })
           if(response.data.error){
            toast.error(response.data.message)
           }
           if(response.data.success){
            toast.success(response.data.message)
            localStorage.setItem('accessToken',response.data.data.accesstoken)
            localStorage.setItem('refreshToken',response.data.data.refreshToken)
            setData({
              
                email : "",
                password : "",
                
               })

               navigate("/")
           }
           
           console.log("res",response);
      } catch (error) {
        AxiosToastError(error)
        
      }

       
       

    }
  return (
    <section className=' w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded-2xl p-4'>
            <p>Login</p>

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
                <div className='grid gap-1 '>
                    <label htmlFor="password">Password</label>
                    <div className='flex bg-blue-50 p-2 border rounded-xl'>
                        <input type={showPassword? "text":"password"}
                        id='password'
                        className='w-full outline-0'
                        name="password"
                        value={data.password}
                        onChange={handleChange}/>
                    <div className='cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                        <FaEye />

                    </div>
                    </div>
                    <Link to={"/forgot-password"} className='block ml-auto text-black hover:text-emerald-900'>Forgot password</Link>
                </div>
                
                <button className='bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold my-2 text-white tracking-wide'>Login</button>
            </form>
            <p>
                Dont have an account? <Link to={'/register'}className='font-semibold text-green-700 hover:text-green-900'>Register</Link>
            </p>
        </div>
        
    </section>
  )
}

export default Login
