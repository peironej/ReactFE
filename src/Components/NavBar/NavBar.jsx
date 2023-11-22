import { Link, NavLink } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget"
import styles from './NavBar.module.css';

export const NavBar = () => {
    return (
        <nav className={styles.NavBarStyle}>
            <img src="/img/farm.png" alt="" style={{ width: "90px" }} />
            <div>
            <NavLink to={"/"}>
                <button className="btn btn-success mx-2">Home</button>
            </NavLink>
            <Link to={"/product"}>
                <button className="btn btn-success mx-2">Productos</button>
            </Link>
            <NavLink to={"/contact"}>
                <button className="btn btn-success mx-2">Contactos</button>
            </NavLink>
            </div>
            <Link to={"/cart"}>
                <CartWidget/>
            </Link>
        </nav>
    )
}
