import React from 'react'
import UserMenu from '../components/UserMenu'
import { MdCancel } from "react-icons/md";


const UserMenuMobile = () => {
  const cancelMenu =() => {
    window.history.back();
  }
  return (
    <section className='bg-white h-full w-full py-5 px-4'>
      <button className='block ml-auto' onClick={cancelMenu}><MdCancel size={26} />
      </button>
      <div className='container mx-auto p-3'>
      <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile