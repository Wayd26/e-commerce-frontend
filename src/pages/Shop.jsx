import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AdminProductCard } from '../components/cards';
import { Checkbox, Radio } from 'antd';
import {Jumbotron} from '../components/cards';
import { prices } from "../prices";


const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [radio, setRadio] = useState([]); // radio
  
    useEffect(() => {
      if (!checked.length || !radio.length) loadProducts();
    }, []);
  
    useEffect(() => {
      if (checked.length || radio.length) loadFilteredProducts();
    }, [checked, radio]);
  
    const loadFilteredProducts = async () => {
      try {
        const { data } = await axios.post("/filtered-products", {
          checked,
          radio,
        });
        console.log("filtered products => ", data);
        setProducts(data);
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
  
    useEffect(() => {
      loadCatgories();
    }, []);
  
    const loadCatgories = async () => {
      try {
        const { data } = await axios.get("/category");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleCheck = (value, id) => {
      console.log(value, id);
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    };

    
  return (
    <>
    <Jumbotron title="Hello World" subtitle="Welcome to React E-commerce" />
    <div className="m-auto p-4">
        <div className="w-full flex flex-wrap">
          <div className="md:w-1/4 w-full">
            <h2 className="p-3 my-2 mx-2 bg-gray-600 rounded-lg shadow text-center text-white dark:bg-gray-700">
              Filter by Categories
            </h2>
            <div className="w-full p-3">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="p-3 my-2 mx-2 bg-gray-600 rounded-lg shadow text-center text-white dark:bg-gray-700">
              Filter by Price
            </h2>
            <div className="w-full p-5 flex">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id} style={{ marginLeft: "8px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0 text-white text-center">
              <button
                className="w-36 bg-sky-600 rounded p-3"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>

          </div>

          <div className="md:w-3/4 w-full">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {products?.length} Products
            </h2>

            <div className="w-full h-screen grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto mx-auto">
              {products?.map((p) => (
                <div className="" key={p._id}>
                  <AdminProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop