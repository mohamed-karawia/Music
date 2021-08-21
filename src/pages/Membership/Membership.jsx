import React, {useState, useEffect} from 'react';
// Styles
import classes from './Membership.module.scss';
// components
import Plan from '../../components/Plan/Plan';
// Axios
import axios from 'axios'

const Membership = (props) => {
    const [plans, setPlans] = useState([]);
    const [isOneTime, setIsOneTime] = useState(false);
    const [userCurrentPlan, setUserCurrentPlan] = useState('')

    useEffect(() => {
        getPlans()
    }, [])

    const getPlans = () => {
        axios.get('/user/pay/plans')
        .then(res => {
            setPlans(res.data.data.plans)
            setIsOneTime(res.data.data.user.gotOneTimePlan)
            setUserCurrentPlan(res.data.data.user.plan.plan)
        })
        .catch(err => {
        })
    }

    const pay = (data) => {
        axios.post('/user/pay/subscription', data)
        .then(res => {
            getPlans()
        })
        .catch(err => {
            window.alert('Error happened, please try again')
        })
    }

    const cancelPlan = () => {
        axios.post('/user/pay/cancel')
        .then(res => {
            getPlans()
            setUserCurrentPlan('')
        })
        .catch(err => {
        })
    }

    return (
        <div className={classes.Membership}>
            <div className={classes.Membership__plans}>
                <h2 className={classes.Membership__plans__heading}>choose a membership plan</h2>
                <div className={classes.Membership__plans__plans}>
                    {plans.map((plan, index) => (
                        <Plan 
                        key={plan._id} 
                        pay={pay}
                        stripe_plan_id={plan._id}
                        price={plan.amount === 1 ? 'free' : plan.amount} 
                        period={plan.name === '3 days plan' ? 'TRIAL FOR 3 Days' : plan.name === 'month plan' ? 'MONTHLY' : 'PER YEAR'} 
                        details={plan.name === '3 days plan' ? ['Listen to all beats', 'Share beats with friends', 'Download 3 beats per day'] : plan.name === 'month plan' ? ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats'] : ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats', 'Save 40%']}
                        pro={plan.name === 'year plan' ? true : false}
                        disable={(plan.name === '3 days plan' && isOneTime) || userCurrentPlan}
                        // eslint-disable-next-line
                        currentPlan={plan._id == userCurrentPlan}
                        getPlans={getPlans} />
                    ))}
                </div>
                {userCurrentPlan && <button onClick={cancelPlan} className={classes.Membership__plans__cancel}>Cancel current plan</button>}
            </div>
            <div className={classes.Membership__bg}>
                <h2>MANY PLANS TO
                    FEEL COMFORT.</h2>
            </div>
            
        </div>
    )
}

export default Membership
