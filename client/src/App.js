import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AddProduct from "./products/AddProduct";
function App() {
  return (
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
        <Route path="/" exact>
          <Landing />
        </Route>
      
    </Template>
  );
}

export default App;
