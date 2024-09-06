import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AddProduct from "./products/AddProduct";
import CartContext, { CartContextProvider } from "./context/CartContextProvier";
import CartView from "./cart/CartView";
import { useContext } from "react";
import Login from "./login/Login.jsx";
import DeleteProduct from "./products/DeleteProduct.jsx";
import { ProductContextProvider } from "./context/ProductContextProvider.js";
import { countProducts } from "./api/api.js";
import Admin from "./components/Admin.jsx";
import OrderDetail from "./components/Order/OrderDetail.jsx";
import Order from "./components/Order/Order.jsx";

import OrdersList from "./components/Order/AdminOrder/OrdersList.jsx";
import Authorize from "./components/Order/Authorize/Authorize.jsx";
function App() {
  return (
    <CartContextProvider>
      <ProductContextProvider>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/order">
          <Order />
        </Route>
        <Template>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/addproduct" exact>
          <Authorize>
          <AddProduct />

          </Authorize>
         
          </Route>
          <Route path="/products/:slug">
            <ProductDetail />
          </Route>
          <Route path="/cart">
            <CartView />
          </Route>
          <Route path="/delete">
          <Authorize>
          <DeleteProduct />

          </Authorize>
           
          </Route>
          <Route path="/allOrders">
         <Authorize>
         <OrdersList />
         </Authorize>
          

        
           
          </Route>
          <Route path="/" exact>
            <ProductList />
          </Route>

          <Route path="/admin">
          <Authorize>
          <Admin />

          </Authorize>
          
          </Route>
        </Template>
      </ProductContextProvider>
    </CartContextProvider>
  );
}

export default App;
