import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
    FaDollarSign,
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaTruckMoving,
    FaWarehouse,
    FaRocket,
} from "react-icons/fa";
import { AdminProductCard } from "../components/cards";
import  toast  from "react-hot-toast";
import { useCart } from "../context/cart";


const ProductView = () => {
    // state
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    // hooks
    const params = useParams();

    //context 
    const [cart, setCart] = useCart()

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async (req, res) => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id);
        } catch (err) {
            console.log(err);
        }
    };

    const loadRelated = async (productId, categoryId) => {
        try {
            const { data } = await axios.get(
                `/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-2 pb-5">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-3/4 p-5">
                    <div className="shadow mb-3">
                        <Badge.Ribbon text={`${product?.sold} sold`} color="red">
                            <Badge.Ribbon
                                text={`${product?.quantity >= 1
                                        ? `${product?.quantity - product?.sold} in stock`
                                        : "Out of stock"
                                    }`}
                                placement="start"
                                color="green"
                            >
                                <img
                                    className="shadow-lg"
                                    src={`${process.env.NODE_ENV === 'development' ?
                                    process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PRODL}/product/photo/${product._id}`}
                                    alt={product.name}
                                    style={{ height: "400px", width: "100%", objectFit: "contain" }}
                                />
                            </Badge.Ribbon>
                        </Badge.Ribbon>

                        <div className="text-center text-gray-700 text-base mb-4 p-5">
                            <h1 className="font-bold text-3xl uppercase">{product?.name}</h1>
                             <p className="font-semi-bold text-left">{product?.description}</p> 
                        </div>

                        <div className="flex justify-between lead p-5 font-bold">
                            <div>
                                <p className="flex my-3 text-lg">
                                    <FaDollarSign className="mr-3 mt-1" /> Price:{" "}
                                    {product?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </p>

                                <p className="flex my-3 text-lg">
                                    <FaProjectDiagram className="mr-3 mt-1" /> Category: {product?.category?.name}
                                </p>

                                <p className="flex my-3 text-lg">
                                    <FaRegClock className="mr-3 mt-1" /> Added: {moment(product.createdAt).fromNow()}
                                </p>

                                <p className="flex my-3 text-lg">
                                    {product?.quantity > 0 ? <FaCheck className="mr-3 mt-1" /> : <FaTimes className="mr-3 mt-1" />}{" "}
                                    {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p className="flex my-3 text-lg">
                                    <FaWarehouse className="mr-3 mt-1" /> Available: {product?.quantity - product?.sold}
                                </p>

                                <p className="flex my-3 text-lg">
                                    <FaRocket className="mr-3 mt-1" /> Sold {product.sold}
                                </p>
                            </div>
                        </div>
                        <div className="p-5">
                            <button
                                onClick={[...cart].findIndex((item) => item._id === product._id) ? () => {
                                    setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                    toast.success("Added to cart");
                                } : () => {
                                    setCart([...cart].filter(x => x._id !== product._id));
                localStorage.setItem("cart", JSON.stringify([...cart].filter(x => x._id !== product._id)));
                                    toast.success("Removed to cart");
                                }}
                                className="font-bold text-lg shadow bg-sky-600 w-full h-12 rounded-md text-white hover:bg-white hover:text-sky-600 hover:shadow-black"
                            >
                                {[...cart].findIndex((item) => item._id === product._id) ? "Add to Cart" : "Remove from cart"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/4 p-3">
                    <h2 className="rounded-lg font-bold text-xl text-center bg-sky-600 w-full text-white p-2 mb-4">Related Products</h2>
                    <hr />
                    {related?.length < 1 && <p className="font-bold text-center pt-5">Nothing found</p>}
                    {related?.map((p) => (
                        <AdminProductCard p={p} key={p._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductView
