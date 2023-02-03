import React, { Fragment, useEffect, useState } from 'react'
import { Jumbotron } from '../../components/cards'
import { AdminMenu } from '../../components/nav'
import { useAuth } from '../../context/auth'
import { Dialog, Transition } from '@headlessui/react'
import { AddCategory, AddOrUpdateCategory, DeleteConfirmation } from '../../components/modals'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminCategory = () => {

  const [auth, setAuth] = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [currentId, setCurrentId] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [type, setType] = useState("")



  const closeModal = () => {
    setName("")

    setIsOpen(false)
  }

  const openModal = (id, name, type = "add") => {
    setType(type)
    if (type === "update") {
      setName(name)
    }
    setCurrentId(id)
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

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/category");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`${data?.name} is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const { data } = await axios.put(`/category/${currentId}`, {
        name: name,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        setName("");
        closeModal()
        loadCategories();
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }


  return (<>
    <AddOrUpdateCategory type={type} id={currentId} name={name} isOpen={isOpen} closeModal={closeModal} handleUpdateCategory={handleUpdateCategory} handleAddCategory={handleAddCategory} handleNameChange={handleNameChange} />
    <DeleteConfirmation type={"category"} isOpenDelete={isOpenDelete} closeDeleteModal={closeDeleteModal} name={currentName} id={currentId} handleNameChange={handleNameChange} loadCategories={loadCategories} />
    <Jumbotron
      subtitle="Admin Category"
    />
    <div className=''>
      <div className="w-full h-sreen flex">
        <div className="w-1/4">

          <AdminMenu />
        </div>
        <div className="w-3/4 p-3">
          <div className='mx-auto'>
            <div className="p-3 my-2 bg-sky-600 rounded-lg dark:bg-gray-700 text-white">Manage Categories</div>
            <div>
              <button onClick={openModal} type="button" className="float-right text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add</button>
            </div>


            <div className="w-full h-full mb-4 overscroll-y-auto relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Catgeory name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full" >
                      <th scope="row" className="w-4/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {c.name}
                      </th>


                      <td className=" px-4 py-4 flex justify-between">
                        <button onClick={() => openModal(c._id, c.name, "update")} className="float-left hover:translate-y-0.5 text-white bg-green-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-green-800 shadow-lg  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Edit</button>
                        <button onClick={() => openDeleteModal(c._id, c.name)} className="float-right hover:translate-y-0.5 text-white bg-red-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Delete</button>
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

export default AdminCategory