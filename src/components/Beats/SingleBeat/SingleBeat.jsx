import React, { useState } from 'react';
import classes from './SingleBeat.module.scss';
// SVG
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart";
import { FaPlayCircle } from "@react-icons/all-files/fa/FaPlayCircle";

const SingleBeat = (props) => {
    const { name, image } = props.beat.beet
    const [isFav, setIsFav] = useState(props.beat.fev)
    const playBeat = (beat) => {
        props.onPlayBeat(beat)
    }
    const toggleFav = () => {
        setIsFav(!isFav);
        props.setFav(props.beat.beet._id)
    }


    return (
        <div className={classes.Beat} >
            <div className={classes.icon__heart} onClick={toggleFav}>
                {isFav ? <FaHeart /> : <FaRegHeart />}
            </div>
            <div className={classes.icon__play} onClick={e => playBeat(props.beat.beet)}>
                <FaPlayCircle />
            </div>
            <div className={classes.Beat__img}>
                <img src={image} alt={name} />
            </div>
            <div className={classes.Beat__details}>
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default SingleBeat
