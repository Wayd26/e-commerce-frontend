import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { Jumbotron, ProductCardHorizontal, UserCartSidebar } from '../components/cards';
import moment from 'moment';

const Cart = () => {
    // context
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    // hooks
    const navigate = useNavigate();

    

    

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.token && auth?.user?.name}`}
                subtitle={
                    cart?.length
                        ? `You have ${cart.length} items in the cart. ${auth?.token ? "" : "Please login to checkout"
                        }`
                        : "Your cart is empty"
                }
            />

            <div className="p-5">
                <div className="w-full flex mx-auto">
                    <div className="w-full">
                        <div className="p-3 my-2 bg-sky-600 text-center text-white font-bold rounded-lg">
                            {cart?.length ? (
                                "MY CART"
                            ) : (
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate("/")}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {cart?.length && (
                <div className="p-3">
                    <div className="w-full flex flex-wrap mx-auto">
                        <div className="w-full md:w-2/3 p-5">
                            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
                                {cart?.map((p, index) => (
                                    <ProductCardHorizontal key={index} p={p} />
                                ))}
                            </div>
                        </div>

                        <UserCartSidebar />
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart