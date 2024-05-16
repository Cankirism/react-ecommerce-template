
    import React, { useEffect, useState } from "react";
   import { useContext } from "react";
   import CartContext from "../context/CartContextProvier";
    const  CartView=()=> {
        
        const context = useContext(CartContext);
           
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
                    context.cart.map((item)=>(
                      
                        <div className="row border-top border-bottom">
                    <div className="row main align-items-center">
                        <div className="col-2"><img className="img-fluid" src={item.tumbrImage}></img></div>
                        <div className="col">
                            <div className="row text-muted">Tuz Lambası</div>
                            <div className="row">{item.name}</div>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-dark">-</button>1
                            <button className="btn btn-outline-dark">+</button>
                          
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
                        <div className="col" style={{textAlign:"center"}}>&euro; 44.00 <span className="close">&#10005;</span></div>
                    </div>
                </div>
               
            </div>
           
        </div>
        
    </div>
    );
    }
    export default CartView;