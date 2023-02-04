import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    })

    // axios config
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.common["Content-Type"] = 'application/json'
  axios.defaults.headers.common["Accept"] = 'application/json'
  axios.defaults.headers.common["Origin"] = '*';


    useEffect(() => {
        const data = localStorage.getItem("auth")

        if(data) {
            const parsed = JSON.parse(data);
            setAuth({...auth, user: parsed.user, token: parsed.token})
        }
        // eslint-disable-next-line
    }, [])


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
