import React, { useState } from 'react';
import classes from './/Forget.module.scss';
// Axios
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner';
// React-router \
import { Link } from 'react-router-dom';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const [error, setError] = useState('');
    const [showCode, setShowCode] = useState(false);
    const [codeLoading, setCodeLoading] = useState(false);
    const [codeError, setCodeError] = useState('false');
    const [password, setPassword] = useState('');
    const [changePasswordLoading, setChangePasswordLoading] = useState('');
    const [changePasswordError, setChangePasswordError] = useState('');
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const sendCode = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            email: email
        }
        axios.post('/user/auth/forget-password', data)
            .then(res => {
                setIsLoading(false)
                setShowCode(true)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.response.data.message)
            })
    }

    const checkCode = (e) => {
        e.preventDefault();
        setCodeLoading(true);
        const data = { 
            email,
            code
        }
        axios.post('/user/auth/forget-password/check', data)
        .then(res => {
            setCodeLoading(false)
            setCodeError('')
            setShowPassword(true)
        })
        .catch(err => {
            setCodeLoading(false)
            setCodeError(err.response.data.message)
        })
    }

    const changePassword = (e) => {
        e.preventDefault();
        const data = {
            email,
            code,
            password,
            comfirmPassword: confirmPassword
        }
        setChangePasswordLoading(true)
        axios.post('/user/auth/forget-password/change-password', data)
        .then(res => {
            setChangePasswordLoading(false)
            setChangePasswordSuccess(true)
            setChangePasswordError('')
        })
        .catch(err => {
            setChangePasswordLoading(false)
            setChangePasswordError(err.response.data.message)
        })
    }

    return (
        <div className={classes.Forget}>
            <form className={classes.Forget__form} onSubmit={e => sendCode(e)}>
                <label>Please Enter your email</label>
                <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                {error && <p style={{ color: 'white', textTransform: 'capitalize', fontSize: '1.6rem', marginBottom: '1rem' }}>{error}</p>}
                <button type="submit">{isLoading ? <Spinner /> : 'Send Code'}</button>
            </form>
            {showCode && <form className={classes.Forget__form} onSubmit={e => checkCode(e)}>
                <label>Please Enter The Code</label>
                <input type="text" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
                <button>{codeLoading ? <Spinner /> : 'Send Code'}</button>
            </form>}
            {showPassword && <form className={classes.Forget__form} onSubmit={e => changePassword(e)}>
                <label>Enter Your New Password</label>
                <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="text" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {error && <p style={{ color: 'white', textTransform: 'capitalize', fontSize: '1.6rem', marginBottom: '1rem' }}>{changePasswordError}</p>}
                {changePasswordSuccess && <p style={{ color: 'white', textTransform: 'capitalize', fontSize: '1.6rem', marginBottom: '1rem' }}>Password changes Successfully, go to <Link to="/login" style={{ color: 'white', textTransform: 'capitalize', fontSize: '1.6rem', marginBottom: '1rem', textDecoration: 'none' }}>Login</Link></p>}
                <button type="submit">{changePasswordLoading ? <Spinner /> : 'Submit'}</button>
            </form>}
        </div>
    )
}

export default Forget
