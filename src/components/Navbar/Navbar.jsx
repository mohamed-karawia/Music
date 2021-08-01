import React from 'react';
import classes from './Navbar.module.scss';
// react-router
import { Link, useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.token !== null)

    const pushLogin = () => {
        history.push('/login')
    }

    const pushSignup = () => {
        history.push('/signup')
    }

    const logout = () => {
        dispatch(actions.logout())
    }
    return (
        <nav className={classes.Navbar}>
            <div className={classes.Navbar__logo}>
                <h1>LOGO</h1>
            </div>
            <ul className={classes.Navbar__list}>
                <li className={classes.Navbar__list__item}><Link to="/">Home</Link></li>
                <li className={classes.Navbar__list__item}><Link to="/">Categories</Link></li>
                <li className={classes.Navbar__list__item}><Link to="/beats?tab=home">beats</Link></li>
            </ul>
            {!isAuth ? <div className={classes.Navbar__auth}>
                <button className={classes.Navbar__auth__login} onClick={pushLogin}>login</button>
                <button className={classes.Navbar__auth__signup} onClick={pushSignup}>signup</button>
            </div> : <div className={classes.Navbar__auth}>
                <button className={classes.Navbar__auth__login} onClick={logout}>logout</button>
            </div>}
        </nav>
    )
}

export default Navbar
