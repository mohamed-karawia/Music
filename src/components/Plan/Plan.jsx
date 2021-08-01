import React from 'react';
// Styles 
import classes from './Plan.module.scss';

const Plan = (props) => {
    return (
        <div className={classes.Plan}>
            <h2 className={classes.Plan__heading}>{props.price}</h2>
            {props.period && <p className={classes.Plan__period}>{props.period}</p>}
            <div className={classes.Plan__details}>
                {props.details.map(i => (
                    <p>{i}</p>
                ))}
                <button className={props.pro ? classes.pro : ''}>Subscribe</button>
            </div>
        </div>
    )
}

export default Plan
