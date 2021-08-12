import React, { useState, useEffect } from 'react';
// Styles
import classes from './Beats.module.scss';
// Components
import SideNav from '../../components/SideNav/SideNav';
import BeatsList from '../../components/Beats/BeatsList/BeatsList';
import BeatsSlider from '../../components/BeatsSlider/BeatsSlider';
import Spinner from '../../components/Spinner/Spinner';
// react-router
import { useLocation, useHistory } from 'react-router-dom'
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
import BeatsPlayer from '../../components/BeatsPlayer/BeatsPlayer';
// Pagination component
import Pagination from "react-js-pagination";
import Backdrop from '../../components/Backdrop/Backdrop';
import Alert from '../../components/Alert/Alert';
// Axios
import axios from 'axios';



const Beats = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [playList, setPlayList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false)
    const [alert, setAlert] = useState('')
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
        // eslint-disable-next-line
    }, [queries])

    const beats = useSelector(state => state.beats.beats);
    const total = useSelector(state => state.beats.total);
    const loading = useSelector(state => state.beats.loading);
    const token = useSelector(state => state.auth.token)
    const isAuth = useSelector(state => state.auth.token !== null);
    // eslint-disable-next-line
    const verify = useSelector(state => state.auth.verify == 'true')

    const changeTab = (tab) => {
        setIsNavOpen(false)
        if ((tab === 'fev' || tab === 'downloads') && !isAuth) {
            history.push('/signup')
        } else {
            history.replace(`/beats?page=${queries.page}&tab=${tab}`)
            setQueries({ ...queries, tab })
        }
    }

    const changeSearch = (value) => {
        history.replace(`/beats?page=${queries.page}&tab=${'home'}&search=${value}`)
        setQueries({ ...queries, search: value, tab: 'home' })
    }

    const changePage = (pageNum) => {
        history.replace(`/beats?page=${pageNum}&tab=${'home'}&search=${queries.search}`)
        setQueries({ ...queries, page: Number(pageNum) })
    }


    const onPlayBeat = (beat) => {
        if (isNavOpen) {
            return
        } else if (!isAuth) {
            history.push('/signup')
        } else if (isAuth && !verify) {
            history.push('/verify')
        }
        else {
            setPlayList([...playList, {
                name: beat.name,
                musicSrc: `${process.env.REACT_APP_BASE_LINK}/stream/audio/uploads/${beat._id}?token=${token}`,
                key: beat._id,
                cover: beat.image,
            }])
        }
    }

    const changePlayList = (id, list, info) => {
        const newList = []
        list.forEach(item => {
            newList.push({
                cover: item.cover,
                name: item.name,
                musicSrc: item.musicSrc,
                key: item.key
            })
        })
        setPlayList(list)
    }

    const customDownloader = (test) => {
        if (isNavOpen) {
            return
        } else if (!isAuth) {
            history.push('/signup')
        } else if (isAuth && !verify) {
            history.push('/verify')
        } else {
                console.log('test')
                 axios.get('/stream/download/check')
                .then(res => {
                    const path = test.src.split('/')
                    const id = path[path.length - 1]
                    const downloadLink = `${process.env.REACT_APP_BASE_LINK}/stream/download/uploads/${id}`
                    const win = window.open(downloadLink, '__blank');
                    win.focus();
                })
                .catch(err => {
                    setAlert('You have reached your maximum downloads limit')
                    setOpenAlert(true)
                })

        }
    }

    const setFav = (id) => {
        if (isNavOpen) {
            return
        } else if (!isAuth) {
            history.push('/signup')
            return
        } else if (isAuth && !verify) {
            history.push('/verify')
        }
        dispatch(actions.setFav(id))
    }

    const onAudioPause = (info) => {
        return
    }

    const closeAlert = () => {
        setOpenAlert(false)
        setAlert('')
    }

    return (
        <div className={classes.Beats}>
            <SideNav currentTab={queries.tab} open={isNavOpen} changeTab={changeTab}></SideNav>
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
                            <input placeholder="SEARCH" type="text" className={classes.Beats__container__slider__elements__upper__search} value={queries.search} onChange={e => changeSearch(e.target.value)} />
                        </div>
                        <div className={classes.Beats__container__slider__elements__lower}>
                            <h2>Most <br /> popular</h2>
                            <p>the most chosen beats this week</p>
                        </div>
                    </div>
                    <BeatsSlider></BeatsSlider>
                </section>
                <section className={classes.Beats__container__beats}>
                    <h2>{queries.tab === 'home' ? 'Beats' : queries.tab === 'fev' ? 'Favorites' : 'downloads'}</h2>
                    {loading ? <Spinner color="purple" /> : <BeatsList setFav={setFav} onPlayBeat={onPlayBeat} beats={beats} />}
                </section>
                {total > 10 && <div className={classes.pagination}>
                    <Pagination
                        activePage={queries.page}
                        itemsCountPerPage={10}
                        totalItemsCount={total}
                        innerClass={classes.pagination__list}
                        linkClass={classes.pagination__list__item}
                        activeLinkClass={`${classes.pagination__list__item} ${classes.pagination__list__item__active}`}
                        onChange={changePage}
                    />
                </div>}
            </div>
            {
                isAuth && <BeatsPlayer
                    playList={playList}
                    clearPlayList={e => setPlayList([])}
                    changePlayList={changePlayList}
                    isAuth={isAuth}
                    customDownloader={customDownloader}
                    onAudioPause={onAudioPause} />
            }
            {openAlert && <Backdrop><Alert closeAlert={closeAlert} alert={alert} /></Backdrop>}
        </div>
    )
}

export default Beats
