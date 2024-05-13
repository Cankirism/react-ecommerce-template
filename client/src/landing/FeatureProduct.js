import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";
import logo from  '../landing/banner-0.jpg'
import { useState } from "react";
function FeatureProduct(props) {
  const product=props.product;
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="250"
          alt=""
          src={props.product.tumbrImage}
         
        />
        <div className="card-body">
          <h5 className="card-title text-center">{props.product.name}</h5>
          <p className="card-text text-center text-muted"></p>
          <div className="d-grid gap-2">
            {/* <Link to={`/products/${product._id}`} state={product}  className="btn btn-outline-dark" replace>
              İncele
            </Link> */}
            <Link
            
            to={{
              pathname:`/products/${product._id}`,
              search:"",
              hash:"",
              state:{product}

            }}
            className="btn btn-outline-dark"
            replace
            >
              İncele
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
