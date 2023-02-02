import React from 'react'
import { AdminProductCard, Jumbotron } from '../components/cards';
import { useSearch } from '../context/search';

const Search = () => {

    const [values, setValues] = useSearch();

  return (
    
    <>
      <Jumbotron
        title="Search results"
        subtitle={
          values?.results?.length < 1
            ? "No products found"
            : `Found ${values?.results?.length} products`
        }
      />

      <div className="container mt-3">
        <div className="row">
          {values?.results?.map((p) => (
            <div key={p._id} className="col-md-4">
              <AdminProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Search