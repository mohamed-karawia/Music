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

    const pushToSignup = (path) => {
        history.push(path)
    }

    const onOpened = (id) => {
        console.log(id)
        setStripePlan(id)
    }

    const onToken = (response) => {
        console.log(stripePlan)
        const data = {
            token: response.id,
            plan: stripePlan
        }
        props.pay(data)
    }


    const isAuth = useSelector(state => state.auth.token !== null)
    const isVerified = useSelector(state => state.auth.verify)

    return (
        <div className={classes.Plan}>
            <h2 className={classes.Plan__heading}>{props.price}{props.price === 'free' ? '' : '$'}</h2>
            {props.period && <p className={classes.Plan__period}>{props.period}</p>}
            <div className={classes.Plan__details}>
                {props.currentPlan && <span className={classes.Plan__details__sub}>subscribed</span>}
                {props.details.map(i => (
                    <p key={i}>{i}</p>
                ))}
               <React.Fragment>
                {isAuth ? <StripeCheckout
                opened={e => onOpened(props.stripe_plan_id)}
                label="Subscribe"
                name="Beats For Mind" // the pop-in header title
                description={`${props.price}`} // the pop-in header subtitle
                ComponentClass="div"
                panelLabel="Give Money" // prepended to the amount in the bottom pay button
                amount={props.price * 100} // cents
                currency="USD"
                token={onToken}
                stripeKey="pk_test_51JLBojIUiHtAtSMpJEiRHTI3V8d07WiLwSOHZIPFmMbQzqkOzrATc3o8Hf8LVALASVuC1o3V7p9pPRhQMBZ26PHV00EebpsM2b"
            >
                <button disabled={props.disable} className={props.pro ? classes.pro : ''}>{!props.disable ? 'Subscribe' : 'Subscribed'}</button>
                </StripeCheckout> : !isVerified ?<button onClick={e => pushToSignup('/verify')} className={props.pro ? classes.pro : ''}>Subscribe</button> : <button onClick={e => pushToSignup('/signup')} className={props.pro ? classes.pro : ''}>Subscribe</button>}
                </React.Fragment>
            </div>
        </div>
    )
}

export default Plan
