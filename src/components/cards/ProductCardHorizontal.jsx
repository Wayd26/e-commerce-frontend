import React from 'react'
import { useCart } from '../../context/cart';
import moment from 'moment';

const ProductCardHorizontal = ({ p, remove = true }) => {

    const [cart, setCart] = useCart();


    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === productId);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
    };
  return (
    <div
                                        key={p._id}
                                        className="mx-auto rounded-lg shadow-2xl bg-white dark:bg-sky-700 w-96 h-56 dark:text-white rounded-md mb-3  border-black"
                                    // style={{ maxWidth: 540 }}
                                    style={{width: 350}}
                                    >
                                        <div className="w-full flex">
                                            <div className="w-full md:w-1/3 p-2">
                                                <img
                                                    src={`${process.env.NODE_ENV === 'development' ?
                                                    process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD}/product/photo/${p._id}`}
                                                    alt={p.name}
                                                    className="w-full"
                                                    style={{
                                                        height: "170px",
                                                        // width: "300px",
                                                        objectFit: "cover",
                                                        // marginLeft: "-12px",
                                                        // borderRopRightRadius: "0px",
                                                    }}
                                                />
                                            </div>
                                            {/* Start */}
                                            <div className="w-full md:w-2/3">
                                                <div className="p-3">
                                                    <h5 className="font-bold text-xl mb-4">
                                                        {p.name}{" "}
                                                        {p?.price?.toLocaleString("en-US", {
                                                            style: "currency",
                                                            currency: "USD",
                                                        })}
                                                    </h5>
                                                    <p className="text-sm italic">{`${p?.description?.substring(
                                                        0,
                                                        50
                                                    )}..`}</p>
                                                </div>

                                                
                                            </div>
                                            {/* End */}

                                            
                                            
                                        </div>
                                        {/* .... */}
                                        <div className="w-full flex justify-between px-5 self-end">
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Listed {moment(p.createdAt).fromNow()}
                                                    </small>
                                                </p>
                                                {remove && (
                                                <button
                                                    className="text-red-400 border-red-400 p-2 border-3 mb-2 cursor-pointer"
                                                    onClick={() => removeFromCart(p._id)}
                                                >
                                                    Remove
                                                </button>
                                                )}
                                            </div>
                                                {/* .... */}
                                    </div>
  )
}

export default ProductCardHorizontal