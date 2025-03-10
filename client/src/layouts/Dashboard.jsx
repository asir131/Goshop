import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.user)

    console.log("user", user);
    
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid  lg:grid-cols-[200px_minmax(900px,_1fr)_100px]'>
            
                {/* left for menu */}
                    <div className='p-4 sticky top-24 overflow-y-auto hidden lg:block border-r'>
                        <UserMenu/>
                    </div>

                {/* right for content */}
                    <div className='bg-white min-h-[75vh]'>
                        <Outlet/>
                    </div>
            
        </div>
    </section>
  )
}

export default Dashboard