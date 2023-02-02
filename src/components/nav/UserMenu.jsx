import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const UserMenu = () => {
    return (
        <aside className="w-full mt-5" aria-label="Sidebar">
            <div className="px-1 py-4 overflow-y-auto rounded bg-sky-600 dark:bg-gray-800 h-screen">
                <a href="/" className="flex items-center pl-2.5 mb-5">
                    <span className="self-center text-sm md:text-xl font-semibold text-white dark:text-white">User Links</span>
                </a>
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/" className="flex p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="inline-block w-6 h-6 text-white overflow-hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3 hidden md:inline-block text-white dark:text-white">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/user/profile" className="flex p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span className="ml-3 hidden md:inline-block text-white dark:text-white">Profile Update</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/user/orders" className="flex p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                            <span className="ml-3 hidden md:inline-block text-white dark:text-white">Orders</span>
                        </NavLink>
                    </li>


                </ul>
            </div>
        </aside>
    )
}

export default UserMenu