import React, { useState, useMemo, useCallback } from "react";

const products = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Carrot", category: "Vegetable" },
  { id: 3, name: "Banana", category: "Fruit" },
  { id: 4, name: "Broccoli", category: "Vegetable" },
];

const refs = [];

export default function ProductList() {
  const [category, setCategory] = useState("All");
  const [productClickCount, setProductClickCount] = useState(0);
  const [useMemoOptimization, setUseMemoOptimization] =
    useState("Without useMemo");
  const [useCallbackOptimization, setUseCallbackOptimization] = useState(
    "Without useCallback"
  );

  //useMemo Filtering Products
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return category === "All"
      ? products
      : products.filter((p) => p.category === category);
  }, [category]);

  //Normal Filtering
  //   const filteredProducts = products.filter((eachProduct) =>
  //     category === "All" ? products : eachProduct.category === category
  //   );
  //   console.log("Filtering Products");

  //useCallback caching functions
  const handleProductClick = useCallback((name) => {
    console.log("Product clicked:", name);
    setProductClickCount((prev) => {
      return prev + 1;
    });
  }, []);

  //Normal functions cashings
  //   const handleProductClick = (name) => {
  //     console.log("Product Clicked", name);
  //     setProductClickCount((prev) => prev + 1);
  //   };

  if (refs.length === 2) {
    console.log(refs[0] === refs[1]);
  }
  refs.push(handleProductClick);

  return (
    <div>
      <center>
        <h1
          onClick={() => {
            setUseMemoOptimization(
              useMemoOptimization === "Without useMemo"
                ? "With useMemo"
                : "Without useMemo"
            );
          }}
        >
          {useMemoOptimization}
        </h1>
        <h1
          onClick={() => {
            setUseCallbackOptimization(
              useCallbackOptimization === "Without useCallback"
                ? "With useCallback"
                : "Without useCallback"
            );
          }}
        >
          {useCallbackOptimization}
        </h1>

        <h2 className="m-2">Product List Click Count : {productClickCount}</h2>

        <h4>
          Category :
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="m-3"
          >
            <option value="All">All</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </h4>
        <br />

        {/* <ul className="m-2"> */}
        {filteredProducts.map((product) => (
          <button
            onClick={() => handleProductClick(product.name)}
            className="btn btn-primary m-2"
            key={product.id}
          >
            {product.name}
          </button>
        ))}
        {/* </ul> */}
      </center>
    </div>
  );
}
