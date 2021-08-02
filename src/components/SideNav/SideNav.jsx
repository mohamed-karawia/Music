import React, { useState } from 'react';
// Styles
import classes from './SideNav.module.scss';
// react-router
import { NavLink } from 'react-router-dom';
// SVG
import { FaRegCompass } from "@react-icons/all-files/fa/FaRegCompass";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { AiOutlineDownload } from "@react-icons/all-files/ai/AiOutlineDownload";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
// Logo
import Logo from '../../assets/logo.png'
// react-router
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const useTag = '<use xlink:href="../../assets/sprite.svg#icon-compass2" />';
const SideNav = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { search } = useLocation();

    const isAuth = useSelector(state => state.auth.token !== null)

    const changeTab = (tab) => {
        props.changeTab(tab)
    }

    const pushToHome = () => {
        history.push('/')
    }

    const logout = () => {
        dispatch(actions.logout())
        history.push('/')
    }

    return (
        <nav className={props.open ? `${classes.SideNav} ${classes.open}` : classes.SideNav}>
            <div className={classes.SideNav__logo} onClick={pushToHome}>
                <img src={Logo} alt="logo" />
            </div>
            <ul className={classes.SideNav__list}>
                <li className={props.currentTab === 'home' ? `${classes.active} ${classes.SideNav__list__item}` : classes.SideNav__list__item}>
                    <div className={classes.link} onClick={e => changeTab('home')}>
                        <FaRegCompass className={classes.SideNav__list__item__icon} />
                        <h2>explore</h2>
                    </div>
                </li>
                <li className={props.currentTab === 'fev' ? `${classes.active} ${classes.SideNav__list__item}` : classes.SideNav__list__item}>
                    <div className={classes.link} onClick={e => changeTab('fev')}>
                        <FaHeart className={classes.SideNav__list__item__icon} />
                        <h2>favorites</h2>
                    </div>
                </li>
                <li className={props.currentTab === 'downloads' ? `${classes.active} ${classes.SideNav__list__item}` : classes.SideNav__list__item}>
                    <div className={classes.link} onClick={e => changeTab('downloads')}>
                        <AiOutlineDownload className={classes.SideNav__list__item__icon} />
                        <h2>downloads</h2>
                    </div>
                </li>
                {isAuth && <li className={classes.SideNav__list__item}>
                    <div className={classes.link} onClick={logout}>
                        <BiLogOut className={classes.SideNav__list__item__icon} />
                        <h2>logout</h2>
                    </div>
                </li>}
            </ul>
        </nav>
    )
}

export default SideNav
