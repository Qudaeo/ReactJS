import s from './Header.module.css'
import logo from './logo.png'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={s.header}>
            <NavLink to='/'>
                <img src={logo} alt="iLike"/>
            </NavLink>
        </header>
    )
}
export default Header;