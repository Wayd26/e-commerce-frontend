import React, { useEffect, useState } from 'react'
import { UserMenu } from '../../components/nav'
import { Jumbotron, ProductCardHorizontal } from '../../components/cards'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import axios from 'axios'

const UserOrders = () => {
    // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />

      <div className="">
        <div className="w-full flex">
          <div className="w-1/4">
            <UserMenu />
          </div>
          <div className="w-3/4 p-3">
            <div className="mx-auto rounded-lg p-3 mt-2 mb-2 bg-sky-600 rounded-lg dark:bg-gray-700 text-white">Orders</div>

            {orders?.map((o, i) => {
              return (
                <div
                  key={o._id}
                  className="border-2 shadow-md overflow-x-auto bg-white rounded mb-5"
                >
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full'>
                      <tr>
                        <th scope="col" className='px-6 py-3'>#</th>
                        <th scope="col" className='px-6 py-3'>Status</th>
                        <th scope="col" className='px-6 py-3'>Buyer</th>
                        <th scope="col" className='px-6 py-3'>Ordered</th>
                        <th scope="col" className='px-6 py-3'>Payment</th>
                        <th scope="col" className='px-6 py-3'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full'>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{i + 1}</td>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{o?.status}</td>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{o?.buyer?.name}</td>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{moment(o?.createdAt).fromNow()}</td>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{o?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="">
                    <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 pt-4">
                      {o?.products?.map((p, i) => (
                        <div className='mx-auto'><ProductCardHorizontal key={i} p={p} remove={false} /></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default UserOrders