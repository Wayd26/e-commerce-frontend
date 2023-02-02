import React from 'react'
// import { Jumbotron } from '../components/cards'
import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import  toast  from 'react-hot-toast'
import { useAuth } from '../context/auth'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, { email, password })

      if (data?.error) {
        toast.error(data.error)
      } else {
        localStorage.setItem("auth", JSON.stringify(data))
        setAuth({...auth, token: data?.token, user: data?.user})
        toast.success("Login Successful")
        setEmail("")
        setPassword("")
        navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`)
      }

    } catch (error) {
      console.log(error)
      toast.error("Login Failed. Try agin.")
    }
  }

  return (
    <div className="flex h-screen w-screen items-center">
      <div className="m-auto w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <NavLink to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
            </div>
            <button onClick={handleLogin} className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <NavLink to="/register" className="font-medium text-sky-600 hover:underline dark:text-primary-500">Sign up</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login