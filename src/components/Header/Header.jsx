import styles from './Header.module.css'
import logo from './logo.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <NavLink to='/'>
                <img src={logo} alt="iLike"/>
            </NavLink>
            <div className={styles.loginBlock}>
                {(props.auth.isAuth)
                    ?<div><span>{props.auth.login}</span> <button onClick={props.logOut} >Log out</button></div>
                    :<NavLink to='/login'>Login</NavLink>}
            </div>

        </header>
    )
}

export default Header