import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../context/CartContextProvier";
import { useContext } from "react";
function Product(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
const context = useContext(CartContext);
  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
       % {props.percentOff} indirimli
      </div>
    );

    offPrice = (
      <>
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${props.product._id}`} href="!#" replace>
          {percentOff}
          {/* <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={props.product.tumbrImage}
          /> */}
           <img
                className="border rounded ratio ratio-1x1"
                alt=""
                width={"150"}
                height={"250"}
                src={props.product.tumbrImage}
              />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {props.product.name}
          </h5>
          <p className="card-text text-center text-muted mb-0">{(<del>{props.product.price+props.product.price/5} TL </del>)} {props.product.price} TL</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3"
            onClick={()=>context.updateCart(props.product)}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
