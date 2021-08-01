import React, { useState, useEffect } from 'react';
// Styles
import classes from './Beats.module.scss';
// Components
import SideNav from '../../components/SideNav/SideNav';
import BeatsSlider from '../../components/BeatsSlider/BeatsSlider';
import Spinner from '../../components/Spinner/Spinner';
// react-router
import { useLocation, useHistory } from 'react-router-dom'
// Temp beats data
import img1 from '../../assets/beat1.png';
import img2 from '../../assets/beat2.png';
import img3 from '../../assets/beat3.png';
import img4 from '../../assets/beat4.png';
import BeatsList from '../../components/Beats/BeatsList/BeatsList';
// Queries
import queryString from 'query-string';
// Redux
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
// Icons
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
// import { FaGlobeAmericas } from "@react-icons/all-files/fa/FaGlobeAmericas";

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'



const Beats = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [playList, setPlayList] = useState([]);
    const { search } = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [queries, setQueries] = useState(queryString.parse(search))
    const closeNav = () => {
        if (isNavOpen) {
            setIsNavOpen(false)
        }
    }


    useEffect(() => {
        dispatch(actions.getBeats(queries))
    }, [queries])

    const beats = useSelector(state => state.beats.beats);
    const total = useSelector(state => state.beats.total);
    const loading = useSelector(state => state.beats.loading);
    const isAuth = useSelector(state => state.auth.token !== null);

    const changeTab = (tab) => {
        setIsNavOpen(false)
        if (tab === 'fev' && !isAuth) {
            history.push('/signup')
        } else {
            history.replace(`/beats?tab=${tab}`)
            setQueries({ ...queries, tab })
        }

    }

    const onPlayBeat = (beat) => {
        if(isNavOpen){
            return
        }
        if (!isAuth) {
            history.push('/signup')
        }
        setPlayList([{
            name: beat.name,
            musicSrc: beat.beet,
            cover: beat.image,
        }])
    }

    const changePlayList = (id, list, info) => {
        setPlayList(list)
    }

    const chechAuth = () => {
        if (!isAuth) {
            history.push('/signup')
            return
        }
    }

    return (
        <div className={classes.Beats}>
            <SideNav open={isNavOpen} changeTab={changeTab}></SideNav>
            <div onClick={closeNav} className={isNavOpen ? `${classes.Beats__container} ${classes.blur}` : classes.Beats__container}>
                <section className={classes.Beats__container__slider}>
                    <div className={classes.Beats__container__slider__elements}>
                        <div className={classes.Beats__container__slider__elements__upper}>
                            <div className={classes.Beats__container__slider__elements__upper__icons}>
                                <AiOutlineMenu onClick={e => setIsNavOpen(true)} className={`${classes.Beats__container__slider__elements__upper__icons__icon} ${classes.menu__icon}`} />
                                <div className={classes.icons__social}>
                                    <FaInstagram className={classes.Beats__container__slider__elements__upper__icons__icon} />
                                    <FaTwitter className={classes.Beats__container__slider__elements__upper__icons__icon} />
                                    <FaFacebookF className={classes.Beats__container__slider__elements__upper__icons__icon} />
                                </div>
                            </div>
                            <input placeholder="SEARCH" type="text" className={classes.Beats__container__slider__elements__upper__search} />
                        </div>
                        <div className={classes.Beats__container__slider__elements__lower}>
                            <h2>Most <br /> popular</h2>
                            <p>the most chosen beats this week</p>
                        </div>
                    </div>
                    <BeatsSlider></BeatsSlider>
                </section>
                <section className={classes.Beats__container__beats}>
                    <h2>{queries.tab === 'home' ? 'Beats' : 'Favorites'}</h2>
                    {loading ? <Spinner color="purple" /> : <BeatsList onPlayBeat={onPlayBeat} beats={beats} />}
                </section>
            </div>
            {isAuth && <ReactJkMusicPlayer
                showMediaSession
                glassBg
                showReload={false}
                showMiniModeCover={true}
                showLyric={false}
                showPlayMode={false}
                audioLists={playList}
                theme="dark"
                onDestroyed={e => setPlayList([])}
                onAudioListsChange={changePlayList}
                showDownload={isAuth} />
                }
        </div>
    )
}

export default Beats
