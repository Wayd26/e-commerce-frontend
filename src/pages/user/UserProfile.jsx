import React, { useEffect, useState } from 'react'
import { Jumbotron } from '../../components/cards'
import { UserMenu } from '../../components/nav'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const UserProfile = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (auth?.user) {
            const { name, email, address } = auth.user;
            setName(name);
            setEmail(email);
            setAddress(address);
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/profile", {
                name,
                password,
                address,
            });

            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data });
                // local storage update
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Jumbotron
                subtitle="User Profile"
            />
            <div className=''>
                <div className="w-full h-sreen flex">
                    <div className="w-1/4">

                        <UserMenu />
                    </div>
                    <div className="w-3/4 p-3">
                        <div className="mx-auto p-3 mt-2 mb-2 bg-sky-600 rounded-lg dark:bg-gray-700 text-white">Manage Profile</div>


                        <form onSubmit={handleSubmit} className="sm:w-5/6 mx-auto p-3 mt-2 mb-2">
                            <div className='my-3'>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>

                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus={true}
                                />
                            </div>

                            <div className='my-3'>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>

                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={true}
                                />
                            </div>

                            <div className='my-3'>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>


                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='my-3'>
                                <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>


                                <textarea
                                    id="address"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='float-right'>
                                <button className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile