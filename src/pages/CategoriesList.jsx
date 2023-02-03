import React from 'react'
import { useCategory } from '../hooks';
import { Jumbotron } from '../components/cards';
import { Link } from 'react-router-dom';

const CategoriesList = () => {
    const categories = useCategory();
  
    return (
      <>
        <Jumbotron subtitle="List of all categories" />
  
        <div className="container overflow-hidden">
          <div className="w-full flex gx-5 gy-5 mt-3 mb-5">
            {categories?.map((c) => (
              <div className="md:w-1/2" key={c._id}>
                <button className="bg-sky-100 w-full flex text-dark p-3 justify-evenly">
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  

export default CategoriesList