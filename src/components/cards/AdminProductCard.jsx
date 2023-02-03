import React from 'react'
import prodImg from '../../assets/images/jumbo-bg.jpg'
import { Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import toast from 'react-hot-toast'
import defaultImg from '../../assets/images/product-box.jpg'

const AdminProductCard = ({ p }) => {

  const navigate = useNavigate()
  const [cart, setCart] = useCart();

  return (
    <div className="w-64 h-84 mx-auto mb-3 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-200">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${p?.quantity >= 1
            ? `${p?.quantity - p?.sold} in stock`
            : "Out of stock"
            }`}
          placement="start"
          color="green"
        >
          <img
            className="rounded-t-lg h-48 w-full"
            src={`${process.env.NODE_ENV === 'development' ?
            process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD}/product/photo/${p._id}` || defaultImg}
            // src={defaultImg} 
            alt={p.name}
          //  style={{ objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="p-5 h-32 overflow-y-auto">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{p?.name}</h5>
        <h4 className="font-bold text-white">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{p?.description?.substring(0, 60)}...</p>
      </div>
      <div className='flex justify-evenly py-2'>


        <button
          onClick={() => navigate(`/product/${p.slug}`)}
          className="hover:text-sky-600 hover:bg-transparent hover:border-sky-600 hover:border-2 inline-flex items-center px-1 py-2 text-sm font-medium  text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-white dark:focus:ring-sky-800">
          View Product
        </button>
        <button
          onClick={[...cart].findIndex((item) => item._id === p._id) ? () => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Added to cart");
          } : () => {
            setCart([...cart].filter(x => x._id !== p._id));
            localStorage.setItem("cart", JSON.stringify([...cart].filter(x => x._id !== p._id)));
            toast.success("Removed to cart");
          }}
          className="hover:text-sky-600 hover:bg-transparent hover:border-sky-600 hover:border-2 inline-flex items-center px-1 py-2 text-sm font-medium  text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-white dark:focus:ring-sky-800">
          {[...cart].findIndex((item) => item._id === p._id) ? "Add to Cart" : "Remove from cart"}
        </button>
      </div>
    </div>
  )
}

export default AdminProductCard