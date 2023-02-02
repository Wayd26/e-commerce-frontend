import React, { useState } from 'react'
import { Jumbotron } from '../cards'
import { useAuth } from '../../context/auth';
import { AppMenu } from '../nav';
import { useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Loading from './Loading';

const AdminRoute = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);


    useEffect(() => {
        const adminCheck = async () => {
          const { data } = await axios.get(`/admin-check`);
          if (data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        };
    
        if (auth?.token) adminCheck();
      }, [auth?.token]);
    
      return ok ? <Outlet /> : <Loading path="" />;
}

export default AdminRoute