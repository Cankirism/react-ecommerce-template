import { createContext, useState } from "react";
import { fetchProduct, getTopProducts } from "../api/api";
import { countProducts } from "../api/api";
const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [count,setcount]=useState(0);
  const getProducts = async () => {
    await setStorageItem();
    return sessionStorage.getItem("products");
  };

  const updateProductList = async (productid) => {
    const addedProduct = await fetchProduct(productid);
    await setStorageItem();
    const items = sessionStorage.getItem("products");
    const updatedItems = [...items, addedProduct];
    await sessionStorage.removeItem("products");
    sessionStorage.setItem("products", updatedItems);
  };

  const setStorageItem = async () => {
    if (sessionStorage.getItem("products") == undefined) {
      console.log("session prdocuts is null will be setted");
        const prd = await getTopProducts();
      if (prd.data == "") {
        sessionStorage.setItem("products", []);
      } else {
        sessionStorage.setItem("products",JSON.stringify( prd.data));
      }
    }
    else {
        console.log("session sstorage product var")
    }
  };

  const countProduct = async ()=>{
    const cnt  = await countProducts();
    return cnt.count;

  }

  const values ={
    getProducts,updateProductList,countProduct
  }

  return (
    <ProductContext.Provider value={values}
    >{children}</ProductContext.Provider>
    
  )
};

export default ProductContext;
