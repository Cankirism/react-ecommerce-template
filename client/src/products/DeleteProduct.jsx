import { useEffect, useState } from "react";
import { getTopProducts } from "../api/api";
import { remove } from "../api/api";
import { HttpStatusCode } from "axios";
import toast,{ Toaster } from "react-hot-toast";
const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    const productList = await getTopProducts();
    setProducts(productList.data);
  });

   const deleteProduct= async (id)=>{
    console.log("delete butonu tıklandı")
    const deleteResult = await remove(id);
  if(deleteResult.status===HttpStatusCode.Ok){
toast.success("Ürün silindi");
  }
  else {
    toast.error("silerken hata")
  }

   }

  
  return (
    <div className="card">
        <Toaster />
      <div className="row">
        <div
          className="col-12"
          style={{
            backgroundColor: "#fff",
            padding: "8vh 5vh",
            borderBottomLeftRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        >
          
          {products.map((item) => (
            <div className="row border-top border-bottom">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img className="img-fluid" src={item.tumbrImage}></img>
                </div>
                <div className="col">
                  <div className="row text-muted">Tuz Lambası</div>
                  <div className="row">{item.name}</div>
                </div>
                
                <div className="col">
                 
                  <span className="close" style={{ color: "red" }} onClick={()=>deleteProduct(item._id)}>
                    {" "}
                    Sil &#10005;
                  </span>
                </div>
              </div>
            </div>
          ))}

         
        </div>
      </div>
    </div>
  );
};
export default DeleteProduct;
