import React from 'react';
import classes from './BeatsList.module.scss';
import SingleBeat from '../SingleBeat/SingleBeat';

const BeatsList = (props) => {
    return (
        <ul className={classes.List}>
            {props.beats.map(beat => (
                <li><SingleBeat key={beat._id} onPlayBeat={props.onPlayBeat} beat={beat} /></li>
            ))}
        </ul>
    )
}

export default BeatsList
