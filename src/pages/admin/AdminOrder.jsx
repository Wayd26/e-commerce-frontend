import React, { useEffect, useState } from 'react'
import { Jumbotron, ProductCardHorizontal } from '../../components/cards';
import moment from 'moment';
import { Select } from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { AdminMenu } from '../../components/nav';


const { Option } = Select;

const AdminOrder = () => {

  const [auth, setAuth] = useAuth();
   const [orders, setOrders] = useState([]);
   const [status, setStatus] = useState([
     "Not processed",
     "Processing",
     "Shipped",
     "Delivered",
     "Cancelled",
   ]);
   const [changedStatus, setChangedStatus] = useState("");
 
   useEffect(() => {
     if (auth?.token) getOrders();
   }, [auth?.token]);
 
   const getOrders = async () => {
     try {
       const { data } = await axios.get("/all-orders");
       setOrders(data);
     } catch (err) {
       console.log(err);
     }
   };
 
   const handleChange = async (orderId, value) => {
     setChangedStatus(value);
     try {
       const { data } = await axios.put(`/order-status/${orderId}`, {
         status: value,
       });
       getOrders();
     } catch (err) {
       console.log(err);
     }
   };
 
   return (
     <>
       <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />
 
       <div className="">
         <div className="w-full flex">
           <div className="w-1/4">
             <AdminMenu />
           </div>
           <div className="w-3/4 p-3">
             <div className="p-3 mt-2 mb-2 bg-white">Orders</div>
 
             {orders?.map((o, i) => {
               return (
                 <div
                   key={o._id}
                   className="border-2 shadow bg-white rounded mb-5 overflow-x-auto"
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
                         <td className='w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                           <Select
                             bordered={false}
                             onChange={(value) => handleChange(o._id, value)}
                             defaultValue={o?.status}
                           >
                             {status.map((s, i) => (
                               <Option key={i} value={s}>
                                 {s}
                               </Option>
                             ))}
                           </Select>
                         </td>
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

export default AdminOrder