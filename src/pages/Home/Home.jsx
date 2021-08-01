import React, { useState, useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
// Router
import { useHistory } from 'react-router-dom';
// Styles 
import classes from './Home.module.scss';
// Components
import Navbar from '../../components/Navbar/Navbar';
// Beats
import img1 from '../../assets/music1.png';
import img2 from '../../assets/music2.png';
import img3 from '../../assets/music3.png';
// Icons
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
// Membership Page
import Membership from '../Membership/Membership';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getBeats({ page: 1, tab: 'home' }))
    }, [])

    const beats = useSelector(state => state.beats.beats)
    const lastThreeBeats = beats.slice(0, 3)
    const isAuth = useSelector(state => state.auth.token !== null)


    const pushLogin = () => {
        history.push('/login')
    }

    const pushSignup = () => {
        history.push('/signup')
    }

    return (
        <React.Fragment>
            <Navbar />
            <section className={classes.header}>
                <div className={classes.header__left}>
                    <h2 className={classes.header__left__heading}>FIND YOUR INNER BEAT</h2>
                    <form className={classes.header__left__form}>
                        <input type="text" />
                        <button><AiOutlineSearch size={30} /></button>
                    </form>
                    <div className={classes.header__left__beats}>
                        <h2><span>New</span> Beats</h2>
                        <ul className={classes.header__left__beats__list}>
                            {
                                lastThreeBeats.map((beat, index) => (
                                    <li className={classes.header__left__beats__list__item} key={index}>
                                        <div className={classes.header__left__beats__list__item__img}>
                                            <img src={beat.beet.image} alt="" />
                                        </div>
                                        <h3>{beat.beet.name}</h3>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {!isAuth ? <div className={classes.header__left__buttons}>
                        <button className={classes.header__left__buttons__login} onClick={pushLogin}>login</button>
                        <p>OR</p>
                        <button className={classes.header__left__buttons__signup} onClick={pushSignup}>signup</button>
                    </div> : null}
                </div>
                <div className={classes.header__right}>
                    <h2 className={classes.header__right__text}>most popular<br /> producer otw</h2>
                </div>
            </section>
            <section>
                <Membership hideMemberShipImage={true}/>
            </section>
        </React.Fragment>
    )
}

export default Home
