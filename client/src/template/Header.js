import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import CartContext from "../context/CartContextProvier";
import { useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Image from "../logo.svg";
import { faWhatsapp, faPhone } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  const context = useContext(CartContext);
  useEffect(() => {
    const hasLoginInfo = sessionStorage.getItem("isLogged");
    if (hasLoginInfo) {
      console.log("login info var");
      setIsloggedIn(true);
    }
  });
  const handleClick = () => {
    console.log("spet tıklandı");
    history.push("/cart");
  };
  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    console.log("clicked");
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
      
      <div className="container">
     
        <Link className="navbar-brand" to="/" onClick={changeNav}>
          {/* <FontAwesomeIcon
            icon={["fab", "bootstrap"]}
            className="ms-1"
            size="lg"
          />
          */}
          {/* <img src={Image} width="100" height="40" style={{objectFit:"contain"}}  /> */}
          {/* <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 250">
<text x="190" y="100" font-family="tahoma" font-size="110" fontWeight="bold" fill="darkorange">Zühre</text>
<line x1="180" y="110" x2="685" y2="110" stroke="orange" strokeWidth="14" />
<line x1="180" y1="120" x2="180" y2="230" stroke="orange" stroke-width="14"/>
<text x="190" y="200" fontFamily="serif" fontWeight="bold" fontSize="88">Tuz Ürünleri</text>

<line x1="180" y1="230" x2="685" y2="230" stroke="orange" stroke-width="14"/>
<line x1="685" y1="230" x2="685" y2="120" stroke="orange" stroke-width="14"/>

</svg>   */}
{/* <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 250">
<text x="190" y="100" font-family="tahoma" font-size="110" fontWeight="bold" fill="darkorange">Zühre</text>


<text x="190" y="200" fontFamily="serif" fontWeight="bold" fontSize="88">Tuz Ürünleri</text>
<line x1="180" y1="235" x2="695" y2="235" stroke="orange" strokeWidth="24" />


</svg>  */}
<svg width="200" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 250">
<text x="190" y="150" font-family="serif" font-size="105" fontWeight="bold" fill="red">Zühre Tuz Ürünleri</text>

<line x1="220" y1="180" x2="1000" y2="180" stroke="black" strokeWidth="8" />
<text x="220" y="250" font-family="arial" font-size="80" fontWeight="normal" fontStyle="italic" fill="black">Çankırı'nın Tuzcusu</text>

</svg> 

          <link rel="icon" href="%PUBLIC_URL%/favicon.ico"></link>
          {/* <span className="ms-2">Zühre Tuz Ürünleri</span> */}
        </Link>
       


        <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
        
          <ul className="navbar-nav me-auto mb-lg-2">
         


            {/* <li className="nav-item">
              {
               isLoggedIn&&(
              
              <Link  to="/addproduct"  onClick={()=>changeNav()} className="nav-link" replace>
                Ürün ekle
              </Link>
           
            )

            
              }
             
            </li>
            <li className="nav-item">
              {
               isLoggedIn&&(
              <Link to="/delete" onClick={()=>changeNav()} className="nav-link" replace>
                Ürün Sil
              </Link>)
            
              }
             
            </li> */}
          </ul>
          
          <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline" onClick={handleClick}>
            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
            <span className="ms-2 badge rounded-pill bg-dark">{context.cart.length}</span>
          </button>
          <ul className="navbar-nav mb-1 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                href="!#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={["fas", "user-alt"]} />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <Link to="/login" className="dropdown-item" onClick={changeNav}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-item" onClick={changeNav}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="d-inline-block d-lg-none">
          <button type="button" className="btn btn-outline-dark" onClick={handleClick}>
            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
            <span className="ms-1 badge rounded-pill bg-dark">{context.cart.length}</span>
          </button>
          <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
   
  );
}

export default Header;
