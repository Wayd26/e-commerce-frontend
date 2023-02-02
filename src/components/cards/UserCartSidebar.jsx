import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import DropIn from "braintree-web-drop-in-react";


const UserCartSidebar = () => {

    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    // state
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    // hooks
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    const cartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const handleBuy = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
               console.log("nonce => ", nonce);
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart,
            });
               console.log("handle buy response => ", data);
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment successful");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
        <div className="w-full md:w-1/4">
            <h2 className="font-bold text-xl">Your cart summary</h2>
            <h3 className="font-bold text-xl">Total / Address / Payments</h3>
            <hr />
            <h6 className='mt-3'>Total: <b>{cartTotal()}</b></h6>
            {auth?.user?.address ? (
                <>
                    <div className="my-3">
                        <hr />
                        <h4>Address:</h4>
                        <b>{auth?.user?.address}</b>
                    </div>
                    <button
                        className="p-2 mx-auto bg-white shadow-sm mt-4 border-5 border-yellow-300 rounded text-yellow-300"
                        onClick={() => navigate("/dashboard/user/profile")}
                    >
                        Update address
                    </button>
                </>
            ) : (
                <div className="mb-3">
                    {auth?.token ? (
                        <button
                            className="p-2 bg-white  shadow-sm mt-4 border-5 border-yellow-300 rounded text-yellow-300"
                            onClick={() => navigate("/dashboard/user/profile")}
                        >
                            Add delivery address
                        </button>
                    ) : (
                        <button
                            className="p-2 bg-white shadow-sm mt-4 border-5 border-red-300 rounded text-red-300"
                            onClick={() =>
                                navigate("/login", {
                                    state: "/cart",
                                })
                            }
                        >
                            Login to checkout
                        </button>
                    )}
                </div>
            )}

<div className="mt-3">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </>
        )}
      </div>
        </div>
    )
}

export default UserCartSidebar