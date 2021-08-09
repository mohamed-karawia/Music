import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}; 

export const authSuccess = (token, verify) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        verify
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const verifyFinished = () => {
    return {
        type: actionTypes.VERIFT_FINISHED
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime)
    }
}

export const saveToLocalStorage = (token, date, verify) => {
    return dispatch => {
        const expirationDate = new Date(new Date().getTime() + date);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('verify', verify);
        dispatch(authSuccess(token, verify))
        dispatch(checkAuthTimeout(date))
    }
}

export const registerUser = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.put('/user/auth/regester' ,data)
        .then(res => {
            console.log(res)
            dispatch(saveToLocalStorage(res.data.data.token, res.data.data.expiresIn, res.data.data.verify))
        })
        .catch(err => {
            console.log(err.response.data.data[0].msg)
            dispatch(authFailed(err.response.data.data.message))
        })
    }
}

export const loginLocal = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/user/auth/login', data)
        .then(res => {
            console.log(res)
            dispatch(saveToLocalStorage(res.data.data.token, res.data.data.expiresIn, res.data.data.verify))
        })
        .catch(err => {
            console.log(err.response.data.message)
            dispatch(authFailed(err.response.data.message))
        })
    }
}

export const loginFacebookOrGoogle = (token, type) => {
    return dispatch => {
        let link = `https://beats-for-minds.herokuapp.com/user/auth/regester/${type}`
        axios.put(link, token)
        .then(res => {
            console.log(res)
            dispatch(saveToLocalStorage(res.data.data.token.token, res.data.data.token.expiresIn, res.data.data.verify))
        })
        .catch(err => {
            console.log(err.response)
        })
        }
}

export const authCheckState = () => {
    return dispatch => {
        const auth = {
            token :localStorage.getItem('token'),
            verify :localStorage.getItem('verify')
        }
        if (!auth.token){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else {
                dispatch(authSuccess(auth.token, auth.verify))
            }
        }
    }
}

export const sendCode = (data) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('/user/auth/verify/send', data)
        .then(res => {
            console.log(res)
            dispatch(verifyFinished())
        })
        .catch(err => {
            console.log(err.response)
            dispatch(verifyFinished())
        })
    }
}

export const checkCode = (data) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('/user/auth/verify/check', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
}