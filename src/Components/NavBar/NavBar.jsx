import { CartWidget } from "../CartWidget/CartWidget"
import styles from './NavBar.module.css';

export const NavBar = () => {
    return (
        <nav className={styles.NavBarStyle}>
            <img src="/img/farm.png" alt="" style={{ width: "90px" }} />
            <div>
            <button className="btn btn-success mx-2">Home</button>
            <button className="btn btn-success mx-2">Insumos</button>
            <button className="btn btn-success mx-2">Contactos</button>
            </div>
            <CartWidget/>
        </nav>
    )
}
