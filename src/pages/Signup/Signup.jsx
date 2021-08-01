import React, { useState } from 'react';
// react-router
import { Link } from 'react-router-dom';
import classes from './Signup.module.scss';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import * as actions from '../../store/actions';
import Spinner from '../../components/Spinner/Spinner';

const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch();
    const registerUser = (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
            comfirmPassword: confirmPassword,
            first_name: fname,
            last_name: lname,
            mobile: phone
        }
        dispatch(actions.registerUser(data))
    }

    return (
        <div className={classes.Signup}>
            <div className={classes.Signup__form}>
                <h2>Sign up</h2>
                <form className={classes.Signup__form__elements} onSubmit={(event) => registerUser(event)}>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="first name"
                            value={fname}
                            onChange={e => setFname(e.target.value)}
                        />
                        <label className={classes.form__label}>first name</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="last name"
                            value={lname}
                            onChange={e => setLname(e.target.value)}
                        />
                        <label className={classes.form__label}>last name</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label className={classes.form__label}>email</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <label className={classes.form__label}>phone number</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label className={classes.form__label}>password</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="password"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <label className={classes.form__label}>confirm password</label>
                    </div>
                    {error && <p className={classes.error}>{error}</p>}
                    <button type="submit" className={classes.button}>{loading ? <Spinner /> : 'sign up'}</button>
                    <p>ALREADY HAVE ACCONT? <Link to="/login">LOGIN</Link></p>
                </form>
            </div>
            <div className={classes.Signup__bg}>
                <h2>join us to find<br /> your inner beat.</h2>
            </div>
        </div>
    )
}

export default Signup
