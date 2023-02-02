import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { Select } from "antd"

const { Option } = Select;

const AddOrUpdateProduct = ({ id, isCategoryChanged, isShippingChanged, setIsChanged, category, description, price, shipping, quantity, photo, categories, isOpen, closeModal, handleAddProduct, handleInputChange, handleUpdateProduct, name, type }) => {



    return (<Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h2"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {type === "add" ? "Add Product" : "Update Product"}
                            </Dialog.Title>
                            {/*  */}


                            {/* {photo && ( 
                            <div className="text-center">
                                <img
                                    // src={URL.createObjectURL(new Blob(new Array(photo), {type: "image/*"}))}
                                    // src={URL.createObjectURL(photo)}
                                    src={`${process.env.REACT_APP_API_URL}/product/photo/${id}`}
                                    alt="product"
                                    className="w-32 mx-auto h-32"
                                    height="200px"
                                />
                            </div>
                            )}

                            <div className="mt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="photo">Photo</label>
                                <input name="photo" id="photo" accept="image/*" onChange={(e) => handleInputChange(e.target.files[0], "photo")} hidden={!photo} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            </div> */}

                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product"
                                        className="w-32 mx-auto h-32 mt-2"
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/product/photo/${id}?${new Date().getTime()}`}
                                        alt="product"
                                        className="w-32 mx-auto h-32 mt-2"
                                    />
                                </div>
                            )}

                            <div className="pt-2 text-center">
                                <label className="shadow-inner cursor-pointer mx-auto p-1 rounded text-white bg-gray-500 border-0 w-full mb-3">
                                    {photo ? photo.name : "Upload photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => handleInputChange(e.target.files[0], "photo")}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className="mt-2">
                                <label for="name" className="mt-2 block text-sm font-medium text-gray-900 dark:text-black">Name</label>
                                <input value={name} onChange={(e) => handleInputChange(e.target.value, "name")} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                            <div className="mt-2">
                                <label for="category" className="block mt-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                                <Select
                                    // showSearch
                                    bordered={false}
                                    // defaultValue={{'value': category._id, 'label':category.name}}
                                    size="small"
                                    className="w-full mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                                    placeholder={!category && !isCategoryChanged ? "" : category.name}
                                    onChange={(value) => handleInputChange(value, "category")}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>



                            <div className="mt-2">
                                <label for="description" className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-black">Description</label>
                                <textarea value={description} onChange={(e) => handleInputChange(e.target.value, "description")} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                            <div className="mt-2">
                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
                                <input value={price} onChange={(e) => handleInputChange(e.target.value, "price")} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>



                            <div className="mt-2">
                                <label for="shipping" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Shipping</label>


                                <Select
                                    bordered={false}
                                    size="small"
                                    className="w-full mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 mb-3"

                                    placeholder={(typeof shipping == String && !isShippingChanged) ? "Choose shipping" : (shipping === true ? "Yes" : "No")}

                                    onChange={(value) => handleInputChange(value, "shipping")}
                                >
                                    <Option className="dark:text-white" value={false}>No</Option>
                                    <Option className="dark:text-white" value={true}>Yes</Option>
                                </Select>

                            </div>



                            <div className="mt-2">
                                <label for="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Quantity</label>
                                <input value={quantity} onChange={(e) => handleInputChange(e.target.value, "quantity")} min="1" type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                            <div className="mt-4 flex justify-between float-right">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={type === "add" ? handleAddProduct : handleUpdateProduct}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className=" sm:ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    )
}

export default AddOrUpdateProduct