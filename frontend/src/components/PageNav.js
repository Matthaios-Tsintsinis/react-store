import axios from "axios";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import styles from "./PageNav.module.css";

axios.defaults.withCredentials = true;

function PageNav() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/check-auth",
          { withCredentials: true }
        );
        console.log(response.data);
        setAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    // <nav>
    //   <ul className={styles.navUl}>
    //     <li className={styles.navItem}>
    //       <NavLink to="/">Home</NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/shop">Shop</NavLink>
    //     </li>
    //   </ul>
    // </nav>

    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <NavItem to="/" type="brand">
        <span className={styles.logo}>Top-Spot</span>
      </NavItem>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample02"
        aria-controls="navbarsExample02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample02">
        <ul className="navbar-nav mr-auto">
          <NavItem to="/" type="">
            Home
          </NavItem>

          <NavItem to="/explore" type="">
            Explore
          </NavItem>

          <NavItem to="/cart" type="">
            Cart
            <img
              src={require("../public/shopping-cart-white.png")}
              alt="shopping cart"
              className={styles.shoppingCart}
            />
          </NavItem>

          <NavItem to="?" type="">
            {authenticated ? "Authenticated" : "Not Authenticated"}
          </NavItem>
        </ul>
        {/* <form className="form-inline my-2 my-md-0">
          <input className="form-control" type="text" placeholder="Search" />
        </form> */}
      </div>
    </nav>
  );
}

export default PageNav;
