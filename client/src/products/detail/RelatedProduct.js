import { useEffect, useState } from "react";
import Image from "../../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { getPopularProducts } from "../../api/api";
function RelatedProduct(props) {
  const price = 10000;
  let percentOff=20
  let offPrice = `${price}Ks`;
  const [popular,setPopular]=useState([]);
   
  useEffect(async ()=>{
   await ss();

  },[]);

  const ss = async()=>{
    console.log("aa");
    const popularProducts = await getPopularProducts();
   
  setPopular(popularProducts.data);
  console.log("props is ",props)
  console.log(popular)
  }
 
  if (percentOff && percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        %{percentOff} indirimli
      </div>
    );

    offPrice = (
      <>
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }

  return (
    <div className="row">
    <div className="col-md-12 mb-4">
      <hr />
      <h4 className="text-muted my-4">Benzer Ürünler</h4>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        {/* {Array.from({ length: 4 }, (_, i) => {
          return (
            <RelatedProduct index={i} percentOff={i % 2 === 0 ? 15 : null} />
          );
        })}  */}
         {popular.map((pr)=>(
         <Link
         to={{
          pathname:`/products/${pr._id}`,
          state:pr

         }}
        
         className="col text-decoration-none"
         href="!#"
         replace
       >
         <div className="card shadow-sm">
           {percentOff}
           {/* <img
             className="card-img-top bg-dark cover"
             height="200"
             alt=""
             src={pr.tumbrImage}
           /> */}
             <img
                className="border rounded ratio ratio-1x1"
                alt=""
                width={"150"}
                height={"220"}
                src={pr.tumbrImage}
              />
           <div className="card-body">
             <h5 className="card-title text-center text-dark text-truncate">
              {pr.name}
             </h5>
             <p className="card-text text-center text-muted">{
             (
             <del>
              { pr.price+pr.price/5
              } TL
              </del>
              
             )} {pr.price} TL</p>
           </div>
           </div>
         
       </Link>


      ))}
      
      </div>
    </div>
  </div>
        
     
 
   
  );
}

export default RelatedProduct;
