import React, {useState, useEffect} from 'react';
// Styles
import classes from './Membership.module.scss';
// components
import Plan from '../../components/Plan/Plan';
import SideNav from '../../components/SideNav/SideNav';
// Axios
import axios from 'axios'

const Membership = (props) => {
    // Plans of subscriptions
    // const plans = [
    //     { price: '1', period: 'TRIAL FOR 3 Days', details: ['Listen to all beats', 'Share beats with friends', 'Download 3 beats per day'] },
    //     { price: '19.99', period: 'MONTHLY', details: ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats']},
    //     { price: '180', period: 'PER YEAR', details: ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats', 'Save 40%'], pro: true },
    // ]
    const [plans, setPlans] = useState([]);
    const [isOneTime, setIsOneTime] = useState(false);
    const [userCurrentPlan, setUserCurrentPlan] = useState('')

    const successPayment = data => {
        alert('Payment Successful');
    };

    const errorPayment = data => {
        alert('Payment Error');
    };

    useEffect(() => {
        axios.get('/user/pay/plans')
        .then(res => {
            console.log(res)
            setPlans(res.data.data.plans)
            setIsOneTime(res.data.data.user.gotOneTimePlan)
            setUserCurrentPlan(res.data.data.user.plan.plan)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const pay = (data) => {
        console.log(data)
        axios.post('/user/pay/subscription', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err.response)
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
                        price={plan.amount} 
                        period={plan.name === '3 days plan' ? 'TRIAL FOR 3 Days' : plan.name === 'month plan' ? 'MONTHLY' : 'PER YEAR'} 
                        details={plan.name === '3 days plan' ? ['Listen to all beats', 'Share beats with friends', 'Download 3 beats per day'] : plan.name === 'month plan' ? ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats'] : ['Listen to all beats', 'Share beats with friends', 'Download unlimited number of beats', 'Save 40%']}
                        pro={plan.name === 'year plan' ? true : false}
                        disable={(plan.name === '3 days plan' && isOneTime) || userCurrentPlan}
                        currentPlan={plan._id == userCurrentPlan} />
                    ))}
                </div>
                
            </div>
            <div className={classes.Membership__bg}>
                <h2>MANY PLANS TO
                    FEEL COMFORT.</h2>
            </div>
            
        </div>
    )
}

export default Membership
