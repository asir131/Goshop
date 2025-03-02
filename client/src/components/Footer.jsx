import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t '>
        <div className='container mx-auto p-4 text-center flex flex-col  lg:flex-row lg:justify-between gap-2'>
            <p>All rights Reserved 2024</p>
            <div className='flex gap-4 items-center justify-center text-2xl'>
                <a href="" className=''>
                <FaFacebook />

                </a>
                <a href="">
                <FaInstagram />

                </a>
                <a href="">
                <FaLinkedin />

                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer