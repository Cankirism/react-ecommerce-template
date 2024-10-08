import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { useEffect } from "react";
import { getTopProducts } from "../api/api";
import Loader from "../components/Loader";
import { paginateProducts } from "../api/api";
const categories = ["Tuz Lambası", "Tuz Ürünleri"];

const manufacturers = ["Zühre"];

function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Ürünler</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-danger rounded-pill me-2 mb-2"
                replace
              >
                {v}
              </Link>
            );
          })}
        </div>
      </li>
      {/* <li className="list-group-item">
        <h5 className="mt-1 mb-1">Brands</h5>
        <div className="d-flex flex-column">
          {brands.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li> */}
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Üretici</h5>
        <div className="d-flex flex-column">
          {manufacturers.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Fiyat Aralığı</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="0"
            />
            <label htmlFor="floatingInput">En az</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="5000"
            />
            <label htmlFor="floatingInput">En Çok</label>
          </div>
          <button className="btn btn-dark bg-danger ">Ara</button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(1);
  useEffect(async () => {
    //const prdct = await getPageProdcuts(pageIndex);
    console.log("prd changed");
   const prd = await getTopProducts();
   setProducts(prd.data);
    
    setisLoading(false);
  }, []);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  const getPageProdcuts = async (page) => {
    try {
      setisLoading(true);
      const prd = await paginateProducts(page);
      setProducts(prd.data);
      setisLoading(false);
    } catch (err) {
      setProducts([]);
    }
  };
  const getNext = async () => {
    setpageIndex((prev) => prev + 1);
   
  };
  const getPrevious = async () => {
    if (pageIndex != 1) {
      setpageIndex((prev) => prev - 1);
    }
  };

  
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              Tüm Ürünler
            </Link>
          </li>
        </ol>
      </nav>

      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categories.map((v, i) => {
            return (
              <div key={i} className="h-link me-2">
                <Link
                  to="/products"
                  className="btn btn-sm btn-outline-dark rounded-pill"
                  replace
                >
                  {v}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filtrele
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">Tüm Ürünler</option>
                  <option value="1">Tuz Lambası</option>
                  <option value="2">Tuz Ürünleri</option>
                </select>
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ara..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {/* {Array.from({ length: 10 }, (_, i) => {
                if (viewType.grid) {
                  return (
                    <Product key={i} percentOff={i % 2 === 0 ? 15 : null} />
                  );
                }
                return (
                  <ProductH key={i} percentOff={i % 4 === 0 ? 15 : null} />
                );
              })} */}
              {isLoading ? (
                <Loader />
              ) : (
                products.map((prd) => {
                  if (viewType.grid) {
                    return (
                      <Product key={prd._id} percentOff="20" product={prd} />
                    );
                  }
                  return (
                    <ProductH key={prd._id} percentOff="20" product={prd} />
                  );
                })
              )}
            </div>
         

            {
            
            /* 
            -- pagination --
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing 10 of 100
              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="pagination my-0">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="!#"
                      onClick={() => getPrevious()}
                    >
                      Önceki
                    </a>
                  </li>
                  <li className="page-item active">
                    <a
                      className="page-link"
                      href="!#"
                      onClick={() => getPageProdcuts(pageIndex)}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item ">
                    <a
                      className="page-link"
                      href="!#"
                      onClick={() => getPageProdcuts(pageIndex)}
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="!#"
                      onClick={() => getPageProdcuts(pageIndex)}
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="!#"
                      onClick={async () => await getNext()}
                    >
                      Sonraki
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
