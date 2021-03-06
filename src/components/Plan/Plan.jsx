import React, {useState} from 'react';
// Styles 
import classes from './Plan.module.scss';
import StripeCheckout from 'react-stripe-checkout';
// Redux
import { useSelector } from 'react-redux';
// react-router
import { useHistory } from 'react-router';


const Plan = (props) => {
    const history = useHistory();
    const [stripePlan, setStripePlan] = useState('')

    const isAuth = useSelector(state => state.auth.token !== null)
    // eslint-disable-next-line
    const isVerified = useSelector(state => state.auth.verify) == 'true'

    const pushToSignup = () => {
        if(!isAuth){
            history.push('/signup')
        }else {
            history.push('/verify')
        }
    }

    const onOpened = (id) => {
        setStripePlan(id)
    }

    const onToken = (response) => {
        const data = {
            token: response.id,
            plan: stripePlan
        }
        props.pay(data)
    }



    return (
        <div className={classes.Plan}>
            <h2 className={classes.Plan__heading}>{props.price}{props.price === 'free' ? '' : '$'}</h2>
            {props.period && <p className={classes.Plan__period}>{props.price === 'free' ? 'Forever' : props.period}</p>}
            <div className={classes.Plan__details}>
                {props.currentPlan && <span className={classes.Plan__details__sub}>subscribed</span>}
                {props.details.map(i => (
                    <p key={i}>{i}</p>
                ))}
               <React.Fragment>
                {isAuth && isVerified && props.price !== 'free' ? <StripeCheckout
                opened={e => onOpened(props.stripe_plan_id)}
                label="Subscribe"
                name="Beats For Mind" // the pop-in header title
                description={`${props.price}`} // the pop-in header subtitle
                ComponentClass="div"
                panelLabel="Give Money" // prepended to the amount in the bottom pay button
                amount={props.price * 100} // cents
                currency="USD"
                token={onToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
            >
                <button disabled={props.disable} className={props.pro ? classes.pro : ''}>{!props.disable ? 'Subscribe' : 'Subscribed'}</button>
                </StripeCheckout> : <button onClick={pushToSignup} className={props.pro ? classes.pro : ''}>Subscribe</button>
                }
                </React.Fragment>
            </div>
        </div>
    )
}

export default Plan
