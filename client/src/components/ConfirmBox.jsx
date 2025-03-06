import React from 'react'
import { IoMdClose } from "react-icons/io";

const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/60 p-4 flex justify-center items-center '>
        <div className='bg-white w-full max-w-md p-4 rounded'>
            <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Confirm Delete</h1>
                <button onClick={close}><IoMdClose size={25}/>
                </button>
            </div>
            <p className='my-4'>Are you sure?</p>
            <div className='w-fit ml-auto flex items-center gap-3'>
                <button className='px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white' onClick={cancel}>Cancel</button>
                <button className='px-3 py-1 border rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-white'onClick={confirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox