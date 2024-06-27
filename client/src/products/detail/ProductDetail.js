import Image from "../../landing/banner0_real.jpg";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link, useLocation, useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useContext, useEffect, useState } from "react";
import { fetchProduct, getImages } from "../../api/api";
import { getPopularProducts } from "../../api/api";
import toast from "react-hot-toast";
import CartContext from "../../context/CartContextProvier";
import Loader from "../../components/Loader";
const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail() {
  const { slug } = useParams();

  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState("");
  const [pimages, setpImages] = useState([]);
  const [product, setProduct] = useState(location.state);
  const context = useContext(CartContext);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    brand: "",
    price: "",
    desciption: "",
    piece: "",
    tumbrImage: "",
  });

  let prd = "";
  useEffect(async () => {
    await getProduct();
   const images =  await getImages(slug);
    console.log("id değişti", slug);

    console.log("sepet", context.cart);
    console.log("images are ",images)
    setpImages(images.data);
    // const product = await fetchProduct(slug);
  }, [slug]);

  const getProduct = async () => {
    try {
      console.log("product is ", product);
      // if(product == undefined){
      //   prd = await fetchProduct(slug);
      //   prd=prd.data;
      // }
      // else {
      //   prd =product.product
      // }
      prd = await fetchProduct(slug);
      prd = prd.data;
      
    
      setCurrentProduct({
        name: prd.name,
        brand: prd.brand,
        price: prd.price,
        description: prd.description,
        piece: prd.piece,
        tumbrImage: prd.tumbrImage,
      });

    
      setSelectedImage(prd.tumbrImage);
      console.log("prd is", prd);
      console.log("selected image is ", pimages[0]);
    } catch (error) {
      prd = await fetchProduct(slug);
      prd = prd.data;
    }
  };

  // const fetchImages =async ()=>{
  //   try {
  //     const images = await getImages(slug);
      
  //     if(images.data==""){
      
  //       setpImages(pimages=>[...pimages,prd.tumbrImage]);
  //     }
  //     else {
  //       setpImages(images.data.imageUrls);
  //     }
  //   }
  //   catch(err){
  //     setpImages(prd.tumbrImage)
  //   }
   
  // }

  function changeRating(newRating) {}

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
            >
              Ürünler
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Tuz Lambaları
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentProduct.name}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {pimages.map((image) => (
                <a key={image._id} href="!#">
                  <img
                    className={"rounded mb-2 ratio "}
                    alt=""
                    width={"70"}
                    height={"70"}
                    src={image}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                width={"150"}
                height={"400"}
                src={selectedImage}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {pimages.map((image) => (
                  <img
                    className="cover rounded mb-2 me-2"
                    alt=""
                    width={"80"}
                    height={"50"}
                    src={image}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-4">{currentProduct.name}</h2>

            <div className="row g-3 mb-4">
              <div className="col">
                <button
                  className="btn btn-outline-dark py-2 w-100"
                  onClick={() => context.addCart(currentProduct)}
                >
                  Sepete Ekle
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Satın al</button>
              </div>
            </div>

            <h4 className="mb-0">Özellikleri</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Kodu</dt>
              <dd className="col-sm-8 mb-3">{slug}</dd>

              <dt className="col-sm-4">Kategori</dt>
              <dd className="col-sm-8 mb-3">Tuz Lambası</dd>

              <dt className="col-sm-4">Üretici</dt>
              <dd className="col-sm-8 mb-3">{currentProduct.brand}</dd>

              <dt className="col-sm-4">Durum</dt>
              <dd className="col-sm-8 mb-3">
                {currentProduct.piece > 0 ? "Stokta Var" : "Ürün Tükendi"}
              </dd>
              <dt className="col-sm-4">Fiyatı</dt>
              <dd className="col-sm-8 mb-3">{currentProduct.price} TL</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Açıklama</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>{currentProduct.description}</small>
            </p>
          </div>
        </div>
      </div>

      <RelatedProduct />
    </div>
  );
}

export default ProductDetail;
