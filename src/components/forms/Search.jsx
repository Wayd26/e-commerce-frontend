import axios from 'axios';
import React from 'react'
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

const Search = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/products/search/${values?.keyword}`);
            console.log("data", data);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className='text-center' onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="hidden md:block  absolute inset-y-0 left-0  items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="md:hidden block my-auto w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} type="search" id="default-search" className="block w-full p-4 h-9  pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white md:dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 focus-within:outline-none focus:outline-none focus-visible:outline-none" placeholder="Enter your text" required />
                <button type="submit" className="hidden md:block h-7 my-auto text-white absolute right-2.5 bottom-1 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                   Search
                   

                    </button>
                <button type="submit" className="md:hidden block h-7 text-white absolute right-2.5 bottom-1 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    
                   <FaSearch />

                    </button>
            </div>
        </form>

    );
}

export default Search