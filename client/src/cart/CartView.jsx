
    import React, { useEffect, useState } from "react";
   import { useContext } from "react";
   import CartContext from "../context/CartContextProvier";
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
        
        <div className="card">
        <div className="row">
            <div className="col-12"
            style={{
                backgroundColor:"#fff",
                padding:"8vh 5vh",
                borderBottomLeftRadius:"1rem",
                borderTopLeftRadius:"1rem"
            }}
            >
                <div style={{marginBottom:"5vh"}}>
                    <div className="row">
                        <div className="col"><h6><b>Sepetteki Ürünler</b></h6></div>
                        <div className="col align-self-center text-right text-muted">{context.cart.length} ürün</div>
                    </div>
                </div>  
                {
                    context.cart.map((item,index)=>(
                      
                        <div className="row border-top border-bottom">
                    <div className="row main align-items-center">
                        <div className="col-2"><img className="img-fluid" src={item.tumbrImage}></img></div>
                        <div className="col">
                            <div className="row text-muted">Tuz Lambası</div>
                            <div className="row">{item.name}</div>
                        </div>
                        <div className="col">
                            <a >-</a>{item.quantity}
                            <a
                            onClick={()=>increaseQuantity(index)}
                            >+</a>
                          
                        </div>
                        <div className="col">{item.price} TL <span className="close" style={{color:"red"}}> Çıkar &#10005;</span></div>
                    </div>
                </div>


                    )
                
                )
                }  
               
               
               
                <div className="row border-top border-bottom">
                    <div className="row main align-items-center">
                       
                        <div className="col" style={{textAlign:"right"}}>
                          <h5>Toplam :</h5>
                        </div>
                        <div className="col" style={{textAlign:"center"}}> {context.totalPrice} TL <span className="close">&#10005;</span></div>
                    </div>
                </div>
               
            </div>
           
        </div>
        
    </div>
    );
    }
    export default CartView;