import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AdminProductCard, Jumbotron } from '../components/cards';

const CategoryView = () => {
  // state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductsByCatgory();
  }, [params?.slug]);

  const loadProductsByCatgory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={category?.name}
        subtitle={`${products?.length} ${products?.length > 1 ? 'products' : 'product'} found in "${category?.name}"`}
      />

      <div className="container-">
        <div className="w-full flex mt-3">
          {products?.map((p) => (
            <div key={p._id} className="md:w-1/3">
              <AdminProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default CategoryView