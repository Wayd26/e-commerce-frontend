import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment } from 'react'
import  toast  from 'react-hot-toast';

const DeleteConfirmation = ({type, isOpenDelete, closeDeleteModal, name, id, loadCategories, loadProducts, handleNameChange }) => {

    const handleDelete = async () => {
        try {
          const { data } = await axios.delete(`/${type}/${id}`);
          console.log("data ", data)
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success(`${data?.name} is deleted`);
            type === "category" ? loadCategories() : loadProducts()
            closeDeleteModal()
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong. Please try again.");
        }
      }
    
      

    return (<Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Delete {type === "categry" ? "Category" : "Product"}
                            </Dialog.Title>
                            <div className="mt-2">
                            <p>
          Are you sure you want to delete <b>{name}</b>?
        </p>
                                    
                            </div>

                            <div className="mt-4 flex justify-between float-right">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={handleDelete}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className=" sm:ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeDeleteModal}
                                >
                                    No
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

export default DeleteConfirmation