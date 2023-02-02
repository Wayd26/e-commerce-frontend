import React, { useEffect, useState } from 'react'
import { Jumbotron, AdminProductCard } from '../../components/cards'
import { AdminMenu } from '../../components/nav'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { Select } from "antd"
import toast from 'react-hot-toast'
import { AddOrUpdateProduct, DeleteConfirmation } from '../../components/modals'
import { useNavigate } from 'react-router-dom'



const AdminProduct = () => {
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [photo, setPhoto] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");


    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/category");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/product");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    // const onChange = (value) => {
    //     console.log(`selected ${value}`);
    // };

    // const onSearch = (value) => {
    //     console.log('search:', value);
    // };

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const [currentName, setCurrentName] = useState("")
    const [type, setType] = useState("")

    const [isShippingChanged, setIsShippingChanged] = useState(false)
    const [isCategoryChanged, setIsCategoryChanged] = useState(false)




    const closeModal = () => {
        setName("");
        setPhoto();
        setDescription("");
        setPrice("");
        setShipping("");
        setQuantity("");
        setCategory("");

        setIsOpen(false)
    }

    const openModal = (product, type = "add") => {
        const { _id, name, photo, category, description, price, shipping, quantity } = product;
        setType(type)
        if (type === "update") {
            setName(name)
            setPhoto(photo);
            setDescription(description);
            setPrice(price);
            setShipping(shipping);
            setQuantity(quantity);
            setCategory(category);
        }
        setCurrentId(_id)
        setIsOpen(true)
    }
    const closeDeleteModal = () => {
        setCurrentName("")
        setIsOpenDelete(false)
    }

    const openDeleteModal = (id, name) => {
        setCurrentId(id)
        setCurrentName(name)
        setIsOpenDelete(true)
    }



    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping.value || shipping);
            productData.append("quantity", quantity);

            const { data } = await axios.post("/product", productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                loadProducts();
                toast.success(`${data.name} is created`);
                closeModal()
                // navigate("/dashboard/admin/product");
            }
        } catch (err) {
            console.log(err);
            toast.error("Create proouct failed. Try again.");
        }
    };

    const handleUpdateProduct = async () => {
        console.log("photo update ", photo)
        console.log("photo update typeof ", typeof photo)


        try {
            if (typeof photo !== "undefined") { console.log("Show") };

            const productData = new FormData();
            if (typeof photo !== "undefined") { productData.append("photo", photo) };
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category._id || category);
            productData.append("shipping", shipping.value || shipping);
            productData.append("quantity", quantity);
            const { data } = await axios.put(`/product/${currentId}`, productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                loadProducts();
                toast.success(`${data.name} is updated`);
                closeModal()
            }
        } catch (err) {
            console.log(err);
            toast.error("Product may already exist. Try again.");
        }
    }

    const handleInputChange = (value, key) => {
        if (key === "name") {
            setName(value)

        }
        if (key === "category") {
            console.log("category change", value)
            setIsCategoryChanged(true)
            setCategory(value)
        }
        if (key === "shipping") {
            setIsShippingChanged(true)
            setShipping(value)

        }
        if (key === "description") {
            setDescription(value)

        }
        if (key === "price") {
            setPrice(value)

        }
        if (key === "quantity") {
            setQuantity(value)

        }
        if (key === "photo") {
            setPhoto(value)

        }

    }

    return (
        <>
            <AddOrUpdateProduct categories={categories}
                type={type}
                id={currentId}
                name={name}
                photo={photo}
                description={description}
                category={category}
                price={price}
                shipping={shipping}
                quantity={quantity}
                isOpen={isOpen}
                closeModal={closeModal}
                handleUpdateProduct={handleUpdateProduct}
                handleAddProduct={handleAddProduct}
                handleInputChange={handleInputChange}
                isCategoryChanged={isCategoryChanged}
                isShippingChanged={isShippingChanged}
            />
            <DeleteConfirmation type={"product"}
                isOpenDelete={isOpenDelete}
                closeDeleteModal={closeDeleteModal}
                name={currentName}
                id={currentId}
                handleInputChange={handleInputChange}
                loadCategories={loadCategories}
                loadProducts={loadProducts} />

            <Jumbotron
                title={`Hello ${auth?.user?.name}`}
                subtitle="Admin Dashboard"
            />
            <div className=''>
                <div className="w-full h-sreen flex">
                    <div className="w-1/4">

                        <AdminMenu />
                    </div>
                    <div className="w-3/4 mx-auto p-3">
                        <div className='mx-auto'>
                            <div className="p-3 my-2 bg-sky-600 rounded-lg dark:bg-gray-700 text-white">Manage Products</div>
                            <div>
                                <button onClick={openModal} type="button" className="float-right text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add</button>
                            </div>

                            <div className="w-full h-full mb-4 overscroll-y-auto relative overflow-x-auto shadow-md rounded-md">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Product name
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((p) => (
                                            <tr key={p._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full" >
                                                <th scope="row" className="w-4/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {p.name}
                                                </th>


                                                <td className=" px-4 py-4 flex justify-between">
                                                    <button onClick={() => openModal(p, "update")} className="float-left hover:translate-y-0.5 text-white bg-green-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-green-800 shadow-lg  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Edit</button>
                                                    <button onClick={() => openDeleteModal(p._id, p.name)} className="float-right hover:translate-y-0.5 text-white bg-red-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Delete</button>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct