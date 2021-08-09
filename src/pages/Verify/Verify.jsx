import React, { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
// Styles
import classes from './Verify.module.scss';
// Redux
import * as actions from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';

const Verify = () => {
    const dispatch = useDispatch();
    const [method, setMethod] = useState('mobile');
    const [codeSent, setCodeSent] = useState(false)
    const loading =  useSelector(state => state.auth.loading)

    const verifyUser = () => {
        setCodeSent(true)
        const data = {
            method
        }
        dispatch(actions.sendCode(data))
    }

    const checkCode = (e) => {
        e.preventDefault();
    }

    return (
        <div className={classes.Verify}>
            <h2 className={classes.Verify__heading}>Please Verify your phone number to continue</h2>
            <div className={classes.Verify__method}>
            </div>
            <button className={classes.Verify__button} onClick={verifyUser}>Send code to mobile</button>
            {codeSent && <div className={classes.Verify__code}>
                {loading ? <Spinner /> : <form onSubmit={e => checkCode}>
                    <input type="text" placeholder="Please inter the code here"/>
                    <button className={classes.Verify__button} type="submit">Submit</button>
                </form>}
            </div>}
        </div>
    )
}

export default Verify
