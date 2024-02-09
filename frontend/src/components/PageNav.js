import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import styles from "./PageNav.module.css";

axios.defaults.withCredentials = true;

function PageNav({ authentication, onRefresh, onOpenCart }) {
  const [userOptions, setUserOptions] = useState(true);

  function signOut() {
    axios
      .get("https://localhost:3000/api/signOut")
      .then((response) => {
        onRefresh();
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response);
      });
  }

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

          <button onClick={onOpenCart} className={styles.cartButton}>
            Cart
            <img
              src={require("../public/shopping-cart-white.png")}
              alt="shopping cart"
              className={styles.shoppingCart}
            />
          </button>

          {authentication.authenticated ? (
            <div className={styles.dropdownContainer}>
              <button
                className={`${styles.dropdownBtn} ${
                  !userOptions ? "active" : ""
                }`}
                onClick={() => setUserOptions((userOptions) => !userOptions)}
              >
                My Account
              </button>
              <div
                className={`${styles.dropDownContentContainer} ${
                  userOptions ? styles.hidden : ""
                }`}
              >
                <div className={styles.dropdownContent}>
                  <Link to="/profile" className={styles.dropdownItem}>
                    Profile
                  </Link>
                  <button className={styles.dropdownItem} onClick={signOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <NavItem to="/signIn">Sign In</NavItem>
          )}
        </ul>
        {/* <form className="form-inline my-2 my-md-0">
          <input className="form-control" type="text" placeholder="Search" />
        </form> */}
      </div>
    </nav>
  );
}

export default PageNav;
