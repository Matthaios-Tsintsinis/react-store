import { NavLink } from "react-router-dom";

//types: disabled, brand
function NavItem({ to, type, classes, children }) {
  return (
    <li className={`nav-item ${type === "brand" ? "logo" : ""}`}>
      <NavLink
        className={`${
          type === "disabled"
            ? "nav-link disabled"
            : type === "brand"
            ? "navbar-brand"
            : "nav-link "
        }`}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
