import React, { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
// Styles
import classes from './Verify.module.scss';
// Redux
import * as actions from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
// react-router
import { Link } from 'react-router-dom';

const Verify = () => {
    const dispatch = useDispatch();
    const method = 'mobile'
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState('')
    const loading =  useSelector(state => state.auth.loading)
    const checkCodeLoading =  useSelector(state => state.auth.checkCodeLoading);
    const checkCodeError = useSelector(state => state.auth.checkCodeError);
    // eslint-disable-next-line
    const verified = useSelector(state => state.auth.verify == 'true');

    const verifyUser = () => {
        setCodeSent(true)
        const data = {
            method
        }
        dispatch(actions.sendCode(data))
    }

    const checkCode = (e) => {
        e.preventDefault();
        const data = {
            code: code
        }
        dispatch(actions.checkCode(data))
    }

    return (
        <div className={classes.Verify}>
            <h2 className={classes.Verify__heading}>Please Verify your phone number to continue</h2>
            <div className={classes.Verify__method}>
            </div>
            <button className={classes.Verify__button} onClick={verifyUser}>Send code to mobile</button>
            {codeSent && <div className={classes.Verify__code}>
                {loading ? <Spinner /> : <form onSubmit={e => checkCode(e)}>
                    <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Please inter the code here"/>
                    {checkCodeError && <p style={{color: 'white', fontSize: '1.5rem', marginTop: '1rem', alignSelf: 'center'}}>{checkCodeError}</p>}
                    {verified && <p style={{color: 'white', fontSize: '1.5rem', marginTop: '1rem', alignSelf: 'center'}}>Success! got to <Link to="/beats?page=1&tab=home"/></p>}
                    <button className={classes.Verify__button} type="submit">{checkCodeLoading ? <Spinner color="purple" /> : 'Submit'}</button>
                </form>}
            </div>}
        </div>
    )
}

export default Verify
