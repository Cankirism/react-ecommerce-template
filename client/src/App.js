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
function App() {
  
  return (


    <CartContextProvider>
      <Route path="/login">
         <Login />
      </Route>
      
      <Template>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/addproduct" exact>
          <AddProduct />
        </Route>
        <Route path="/products/:slug">
          <ProductDetail />
        </Route>
       <Route path="/cart">
        <CartView/>
       </Route>
      
        <Route path="/" exact>
          
          <Landing />
        </Route>
       
      </Template>
    </CartContextProvider>
  );
}

export default App;
