import styles from './Header.module.css'
import logo from '../../assets/images/logo.png'
import {NavLink} from "react-router-dom";
import { HeaderPropsType } from '../../types/types';

const Header = ({auth, logout}: HeaderPropsType) => {
    return (
        <header className={styles.header}>
            <NavLink to='/profile'>
                <img className={styles.logo} src={logo} alt="iLike"/>
            </NavLink>
            <div className={styles.loginBlock}>
                {(auth.isAuth)
                    ? <div><span>{auth.login}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>

        </header>
    )
}

export default Header