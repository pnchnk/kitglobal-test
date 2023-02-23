import React, { useEffect } from "react";

import Header from "./components/Header/Header";
import Card from "./components/Card/Index";

import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getProducts } from "./redux/products";
import { Product } from "./types";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const products = useAppSelector((state) => state.products.products);

  console.log(products.products);

  const basket = useAppSelector((state) => state?.basket);
  useEffect(() => {
    console.log(basket);
  }, [basket]);

  return (
    <>
      <Header />
      <div className="App">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.products?.map((item: Product) => {
              return (
                <Card
                  id={item.id}
                  key={item.id}
                  thumbnail={item.thumbnail}
                  price={item.price}
                  title={item.title}
                  product={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
