import React, { useEffect, useRef, useState } from 'react'
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link,useLocation  } from "react-router";
const OtpVarification = () => {
    const [data,setData] = useState(["","","","","",""])
    const inputRef = useRef([])
     const navigate = useNavigate()
    const location = useLocation()

    useEffect(() =>{
      if(!location?.state?.email){
        navigate("/forgot-password")
      }
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()


      try {
        const response = await Axios({
            ...SummaryApi.forgotPasswordOtpVerfication,
            data: {
              otp : data.join(""),
              email : location?.state?.email
            }
           })
           if(response.data.error){
            toast.error(response.data.message)
           }
           if(response.data.success){
            toast.success(response.data.message)
            setData(["","","","","",""])

               navigate("/reset-password",{
                state : {
                  data : response.data,
                  email : location?.state?.email
                }
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
            <p className='font-bold'>Enter the Otp</p>

            <form action="" className='grid gap-2 mt-4' onSubmit={handleSubmit}>
               
                <div className='grid gap-1'>
                    <label htmlFor="otp">Otp</label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                      {
                        data.map((element,index)=>{
                          return (
                            <input type="text" 
                            key={"otp"+index}
                    id='otp'
                    ref={(ref)=>{
                      inputRef.current[index]= ref
                      return ref
                    }}
                    value={data[index]}
                    onChange={(e)=>{
                      const value = e.target.value
                      
                      const newData = [...data]
                      newData[index] = value
                      setData(newData)

                      if(value && index<5){
                        inputRef.current[index+1].focus()
                      }
                    }}
                    maxLength={1}
                    className='bg-blue-50 w-full max-w-16 p-2 border rounded-xl text-center font-semibold'
                    name="otp "
                    
                   />
                          )
                        })
                      }
                    </div>
                    
                </div>
                
                
                <button className='bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold my-2 text-white tracking-wide'>Verify Otp</button>
            </form>
            <p>
                Already have an account? <Link to={'/login'}className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
        </div>
        
    </section>
  )
}

export default OtpVarification
