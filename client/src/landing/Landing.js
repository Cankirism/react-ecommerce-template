import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopProducts } from "../api/api";
function Landing() {
  const  [allproducts,setallproducts]=useState([]);
  useEffect(async ()=>{
    console.log("useeffect çalıştı ..");
    const products = await getTopProducts();
    console.log("produts is ",products);
    setallproducts(products.data);
  },[])
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          ÇANKIRININ MEŞHUR TUZ LAMBALARI
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
           Ürünler Gör
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">Çok Satan Ürünler</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
         
         {allproducts.map((product)=>
        {
           return <FeatureProduct key = {product._id}  product ={product} />
         
        }
         )}
          {/* {Array.from({ length: 6 }, (_, i) => {
            return <FeatureProduct key={i}  />;
          })} */}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
