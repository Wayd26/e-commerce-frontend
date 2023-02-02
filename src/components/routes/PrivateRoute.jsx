import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { Loading } from '../routes' 
import axios from 'axios'



const PrivateRoute = () => {

    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
      const authCheck = async () => {
        const {data} = await axios.get(`/auth-check`)
        
        if(data.ok) {
            setOk(true)
        } else {
            setOk(false)
        }
    }

    if (auth?.token) authCheck();
        
    }, [auth?.token])
    

    // useEffect(() => {
    //     if(auth?.token) {
    //         setOk(true)
    //     } else {
    //         setOk(false)
    //     }
    // }, [auth?.token])
    
  return ok ? <Outlet /> : <Loading />
}

export default PrivateRoute