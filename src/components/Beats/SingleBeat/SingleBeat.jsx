import React from 'react';
import classes from './SingleBeat.module.scss';

const SingleBeat = (props) => {
    const {name, artist, image} = props.beat.beet
    const playBeat = (beat) => {
        props.onPlayBeat(beat)
    }

    return (
        <div className={classes.Beat} onClick={e => playBeat(props.beat.beet)}>
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
