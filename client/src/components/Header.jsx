import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  // const [openUserMenu, setOpenUserMenu] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  // const cartItem = useSelector(state => state.cartItem.cart)

  const redirectToLoginPage = () => {
    navigate("/login")

  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    navigate("/user")

  }

  return (
    <header className='h-24 lg:h-20 z-5 lg:shadow-md sticky top-0 flex  flex-col justify-center gap-1 bg-white'>

      {
        !(isSearchPage && isMobile) &&
        (
          <div className='container mx-auto flex items-center    px-2 justify-between'>
            {/* logo */}

            <div className='h-full'>
              <Link to="/" className='h-full flex justify-center items-center '>
                <img src={logo} alt="" width={170} height={60} className='hidden lg:block' />
                <img src={logo} alt="" width={120} height={60} className='lg:hidden ' />
              </Link>
            </div>
            {/* search */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/* login and my cart */}
            <div>

              {/* user icon will be displayed in the mobile version only */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                <FaRegUserCircle size={26} />

              </button>

              {/* desktop part */}
              <div className='hidden lg:flex items-center gap-10'>
                {
                  user?._id ? (
                    <div className='relative cursor-pointer'>
                      <div className='flex items-center gap-2 select-none'>
                        <p onClick={() => setOpenUserMenu(preve => !preve)}>Account</p>
                        {
                          openUserMenu ? (
                            <VscTriangleUp size={25} />

                          ) : (
                            <VscTriangleDown size={25} />
                          )
                        }
                        {
                          openUserMenu && (
                            <div className='absolute right-0 top-12'>
                              <div className='bg-white rounded p-4 min-w-52 lg:shadow-2xl'>
                                <UserMenu close={handleCloseUserMenu} />
                              </div>

                            </div>

                          )
                        }



                      </div>

                    </div>
                  ) : (

                    <button onClick={redirectToLoginPage} className='font-bold '>Login</button>
                  )
                }
                <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white'>
                  <div className='hover:animate-bounce'>
                    <FaCartShopping size={28} />

                  </div>
                  <div className='font-bold'>
                    {
                      cartItem[0] ? (
                        <div>
                          <p>{totalQty} Items</p>
                          <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                      ) : (
                        <p>My Cart</p>
                      )
                    }
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
      {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
    </header>
  )
}

export default Header