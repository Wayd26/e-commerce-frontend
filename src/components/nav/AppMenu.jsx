import React, { Fragment } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { Menu, Transition } from '@headlessui/react'
import userPic from '../../assets/icons/user.png'
import { Search } from '../forms'
import { useCategory } from '../../hooks'
import { Badge } from 'antd'
import { useCart } from '../../context/cart'
import { FaHome, FaUser, FaShoppingCart, FaSignInAlt, FaUserTag } from 'react-icons/fa'
import { GiShop } from 'react-icons/gi'
import { RiLoginBoxFill } from 'react-icons/ri'

const AppMenu = () => {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();


  const navigate = useNavigate();
  const categories = useCategory();


  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login")
  }

  return (
    // className="nav-link block p-2 text-gray-600 hover:text-gray-700  focus:text-gray-700 transition duration-150 ease-in-out"
    <nav className="z-50 bg-white flex justify-between space-x-4 shadow-xl md:h-16 h-32 sticky top-0 flex-wrap">
      <NavLink to="/" className="hidden md:block font-bold px-3 py-5 text-slate-700 rounded-lg focus:bg-gray-600 active:bg-gray-600 hover:bg-slate-100 hover:text-slate-900 text-center">HOME</NavLink>
      <NavLink to="/" className="md:hidden block font-bold px-3 py-5 text-slate-700 rounded-lg focus:bg-gray-600 active:bg-gray-600 hover:bg-slate-100 hover:text-slate-900 text-center"><FaHome className='w-5 h-5 text-sky-600' /></NavLink>
      <NavLink to="/shop" className="hidden md:block font-bold px-3 py-5 text-slate-700 rounded-lg focus:bg-gray-600 active:bg-gray-600 hover:bg-slate-100 hover:text-slate-900 text-center">SHOP</NavLink>
      <NavLink to="/shop" className="md:hidden block font-bold px-3 py-5 text-slate-700 rounded-lg focus:bg-gray-600 active:bg-gray-600 hover:bg-slate-100 hover:text-slate-900 text-center"><GiShop className='w-5 h-5 text-sky-600'/></NavLink>

      <div className="block font-bold pl-3 pr-6 md:pr-3 py-5 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900">
        <Badge
          count={cart?.length >= 1 ? cart.length : 0}
          offset={[12, 1]}
          showZero={true}
        >
          <NavLink className="nav-link hidden md:block" aria-current="page" to="/cart">
            CART
          </NavLink>
          <NavLink className="nav-link md:hidden bloc" aria-current="page" to="/cart">
            <FaShoppingCart className='w-5 h-5 text-sky-600' />
          </NavLink>
        </Badge>
      </div>

      {/* categories select */}
      {/* <div className="py-3 top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            CATEGORIES
    <svg className="w-4 h-5 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

           
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    className={`${
                      active ? 'bg-sky-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    to="/categories"
                  >
                   
                    All Categories
                  </NavLink>
                )}
              </Menu.Item>
              
            </div>
            {categories?.map((c) => (
                <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      className={`${
                        active ? 'bg-sky-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      to={`/category/${c.slug}`}
                    >
                     
                     {c.name}
                    </NavLink>
                  )}
                </Menu.Item>
                
              </div>
              ))}
        
          </Menu.Items>
        </Transition>
      </Menu>
    </div> */}
      {/* categories select */}


<div>

      {!auth?.user ? (
        <div className="inline-flex">
          <NavLink to="/login" className="hidden md:block font-bold px-2 py-5 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900">LOGIN</NavLink>
          <NavLink to="/login" className="md:hidden block font-bold px-2 py-5 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900"> <RiLoginBoxFill className='w-5 h-5 text-sky-600'/> </NavLink>
          <NavLink to="/register" className="hidden md:block font-bold px-2 py-5 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900">REGISTER</NavLink>
          <NavLink to="/register" className="md:hidden block font-bold px-2 py-5 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900"><FaUserTag className='w-5 h-5 text-sky-600'/></NavLink>
        </div>
      ) : (
        <div className="flex items-center">

          <Search />

          <div className="py-3 top-16 w-56 text-right ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FaUser className="w-5 h-5 mr-2 rounded-full my-auto " alt="user" />
                  <div className="my-auto hidden md:block">{auth?.user?.name?.toUpperCase()}</div>
                  <svg className="w-4 h-5 mx-1.5 my-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>


                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                        >

                          Dashboard
                        </NavLink>
                      )}
                    </Menu.Item>

                  </div>

                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={logout}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

      )}
      </div>
    </nav>


  )
}

export default AppMenu


