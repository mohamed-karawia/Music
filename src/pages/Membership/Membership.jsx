import React from 'react';
// Styles
import classes from './Membership.module.scss';
// components
import Plan from '../../components/Plan/Plan';

const Membership = (props) => {
    // Plans of subscriptions
    const plans = [
        {price: 'free',period: 'FOREVER', details: ['Listen to all beats', 'Save any beat tou like', 'Share beats with friends']},
        {price: '1$', period: 'TRIAL FOR 3 Days' ,details: ['Listen to all beats', 'Save any beat tou like', 'Share beats with friends', 'Download 3 beats per day']},
        {price: '39.44$', period: 'MONTHLY FREE' ,details: ['Listen to all beats', 'Save any beat tou like', 'Share beats with friends', 'Download unlimited number of beats'], pro: true},   
    ]
    return (
        <div className={props.hideMemberShip ? `${classes.Membership}` : `${classes.Membership} ${classes.HideBg}`}>
            <div className={classes.Membership__plans}>
                <h2 className={classes.Membership__plans__heading}>choose a membership plan</h2>
                <div className={classes.Membership__plans__plans}>
                    {plans.map((plan, index) => (
                        <Plan key={index} price={plan.price} period={plan.period} details={plan.details} pro={plan.pro} />
                    ))}
                </div>
            </div>
            {!props.hideMemberShipImage &&<div className={classes.Membership__bg}>
                <h2>MANY PLANS TO
                    FEEL COMFORT.</h2>
            </div>}
        </div>
    )
}

export default Membership
