import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";
import logo from  '../landing/banner-0.jpg'
function FeatureProduct(props) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={logo}
        />
        <div className="card-body">
          <h5 className="card-title text-center">Astım Dostu Tuz Lambası</h5>
          <p className="card-text text-center text-muted"></p>
          <div className="d-grid gap-2">
            <Link to="/products/1" className="btn btn-outline-dark" replace>
              İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
