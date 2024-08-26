
    import React, { useEffect, useState } from "react";
   import { useContext } from "react";
   import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

   import CartContext from "../context/CartContextProvier";
import { Link } from "react-router-dom";
    const  CartView=()=> {
        
        const context = useContext(CartContext);
        const [totalPrice,setTotalPrice]=useState(0);
         
        const increaseQuantity=(index)=>{

            const newCartItems = [...context.cart];
            newCartItems[index].quantity+=1;
            context.updateCartItems(newCartItems);
            context.calculateTotalPrice( newCartItems);
        }
        console.log("sepetteki ürünler",context.cart);
       
         
    return (
        
    //     <div className="card">
    //     <div className="row">
    //         <div className="col-12"
    //         style={{
    //             backgroundColor:"#fff",
    //             padding:"8vh 5vh",
    //             borderBottomLeftRadius:"1rem",
    //             borderTopLeftRadius:"1rem"
    //         }}
    //         >
    //             <div style={{marginBottom:"5vh"}}>
    //                 <div className="row">
    //                     <div className="col"><h6><b>Sepetteki Ürünler</b></h6></div>
    //                     <div className="col align-self-center text-right text-muted">{context.cart.length} ürün</div>
    //                 </div>
    //             </div>  
    //             {
    //                 context.cart.map((item,index)=>(
                      
    //                     <div className="row border-top border-bottom">
    //                 <div className="row main align-items-center">
    //                     <div className="col-2"><img className="img-fluid" src={item.tumbrImage}></img></div>
    //                     <div className="col">
    //                         <div className="row text-muted">Tuz Lambası</div>
    //                         <div className="row">{item.name}</div>
    //                     </div>
    //                     <div className="col">
    //                         <a >-</a> {item.quantity}
    //                         <a
    //                         onClick={()=>increaseQuantity(index)}
    //                         > +</a>
                          
    //                     </div>
    //                     <div className="col">{item.price} TL <span className="close" style={{color:"red"}}> Çıkar &#10005;</span></div>
    //                 </div>
    //             </div>


    //                 )
                
    //             )
    //             }  
               
               
               
    //             <div className="row border-top border-bottom">
    //                 <div className="row main align-items-center">
                       
    //                     <div className="col" style={{textAlign:"right"}}>
    //                       <h5>Toplam :</h5>
    //                     </div>
    //                     <div className="col" style={{textAlign:"center"}}> {context.totalPrice} TL <span className="close">&#10005;</span></div>
    //                 </div>
    //             </div>
               
    //         </div>
           
    //     </div>
        
    // </div>
    <div className="containerd ">
        <h6> Sepetteki Ürünler</h6>
        <div className="cartt">
            {
                context.cart.map((item,index)=>(
                    <div className="productd">
                    <img src={item.tumbrImage} alt={item.name}/>
                    <div className="productd-info">
                        <h5>{item.name}</h5>
                        <p>Fiyat: {item.price} TL</p>
                        <p>
                        <a >-</a> {item.quantity}
                             <a onClick={()=>increaseQuantity(index)}
                             > +</a>

                        </p>
                        
                        <button className="remove-btn" onClick={()=>context.removeFromCart(item)}>Kaldır</button>
                    </div>
                </div>


                ))
            }
           
           <div className="total" style={{ marginTop:"20px",textAlign:"right"}}>
            <h5>Toplam Tutar: {context.totalPrice} TL</h5>
            <Link className="btn" to={{pathname:'/order',state:{cart:context.cart}}}>
          <button className="btn  btn-outline-success w-100 mt-3  text-success"
           // onClick={()=>context.addCart(props.product)}
          
            >
              <FontAwesomeIcon icon={["fas", "check"]}   /> Siparişi Onayla
            </button>
          </Link>
            
        </div>
        </div>
       
    </div>
  
    );
    }
    export default CartView;