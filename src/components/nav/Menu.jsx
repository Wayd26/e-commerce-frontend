import React from 'react'
import { NavLink } from 'react-router-dom'
import { Jumbotron } from '../cards'

const Menu = () => {
  return (

 // className="nav-link block p-2 text-gray-600 hover:text-gray-700  focus:text-gray-700 transition duration-150 ease-in-out"
 <nav className="flex justify-center space-x-4 shadow-xl h-16 sticky top-0 mb-8">
 <NavLink to="/" className="block font-bold px-3 py-4 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900 text-center">Home</NavLink>
 <NavLink to="/login" className="block font-bold px-3 py-4 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900">Login</NavLink>
 <NavLink to="/register" className="block font-bold px-3 py-4 text-slate-700 rounded-lg focus:bg-sky-600 active:bg-sky-600 hover:bg-slate-100 hover:text-slate-900">Register</NavLink>
</nav>


  )
}

export default Menu


              