import React, { useState } from 'react';
// react-router
import { Link } from 'react-router-dom';
import classes from './Login.module.scss';
// actions
import * as actions from '../../store/actions'
// Redux
import { useDispatch, useSelector } from 'react-redux';
// react-router
import { useHistory } from 'react-router';
// Components
import Spinner from '../../components/Spinner/Spinner';
// Icons
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
// Facebook Login
import FacebookLogin from 'react-facebook-login';
// Google Login
import GoogleLogin from 'react-google-login';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const loginLocal = (event) => {
        event.preventDefault();
        const data = {
            emailOrMobile: email,
            password
        }
        dispatch(actions.loginLocal(data))
    }

    const goBack = () => {
        history.goBack()
    }

    const responseFacebook = (response) => {
        console.log(response);
        const token = {
            access_token: response.accessToken
        }
        dispatch(actions.loginFacebookOrGoogle(token, 'facebook'))
    }

    const responseGoogle = (response) => {
        console.log(response.accessToken);
        const token = {
            access_token: response.accessToken
        }
        dispatch(actions.loginFacebookOrGoogle(token, 'google'))
    }

    return (
        <div className={classes.Signup}>
            <div className={classes.Signup__form}>
                <div className={classes.Signup__form__back} onClick={goBack}>
                    <FaArrowLeft />
                </div>
                <h2>Login</h2>
                <form className={classes.Signup__form__elements} onSubmit={(event) => loginLocal(event)}>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="email or phone number"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label className={classes.form__label}>email or phone number</label>
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
                    {error && <p className={classes.error}>{error}</p>}
                    <button type="submit" className={classes.button}>{loading ? <Spinner /> : 'Login'}</button>
                    <p>NOT A MEMBER YET? <Link to="/signup">SIGN UP</Link></p>
                </form>
                <div className={classes.google_facebook}>
                    <p>Or</p>
                    <FacebookLogin
                        appId="1867797723379430"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                    <GoogleLogin
                        clientId="95840003083-846fert97pdnrbimt2g4jgak4v9trqfl.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        responseType={'token'}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            <div className={classes.Signup__bg}>
                <h2>CHOOSE THE BEAT<br />
                    WHICH FITS YOUR STYLE.</h2>
            </div>
        </div>
    )
}

export default Login
