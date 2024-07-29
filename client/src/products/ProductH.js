import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductH(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{props.product.price+(props.product.price/5)}TL</del> {props.product.price}TL
      </>
    );
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              {percentOff}
              <img
               // className="rounded-start bg-dark cover w-100 h-100"
               className="border rounded ratio ratio-1x1" 
               alt=""
               width="50"
               height="80"
                src={props.product.tumbrImage}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h7 className="card-title text-dark text-truncate mb-1">
                 {props.product.name}
                </h7>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                <button className="btn  btn-outline-danger ms-auto mt-3  text-danger"
           // onClick={()=>context.addCart(props.product)}
          
            >
              <FontAwesomeIcon icon={["fas", "info-circle"]}   /> İncele
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
