import React, { useEffect, useState } from 'react'
import { AdminProductCard, Jumbotron } from '../components/cards'
import axios from 'axios';


const Home = () => {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count")
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <>
    <div>
      <Jumbotron subtitle="Welcome" />

      <div className="w-full flex justify-between flex-wrap">
        <div className="md:w-1/2 w-full p-3">
          <h2 className="p-3 mt-2 mb-2 dark:bg-gray-700 bg-sky-600 rounded-lg  text-center text-white font-bold">
            New Arrivals
          </h2>
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
            {products?.map((p) => (
              <div className="" key={p._id}>
                <AdminProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full p-3">
          <h2 className="p-3 mt-2 mb-2 dark:bg-gray-700 bg-sky-600 rounded-lg  text-center text-white font-bold">
            Best Sellers
          </h2>
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
            {sortedBySold?.map((p) => (
              <div className="" key={p._id}>
                <AdminProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full text-center p-5">
        {products && products.length < total && (
          <button
            className="bg-green-700 md:w-1/2"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
      
    </div>
    </>
  )
}

export default Home