import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}; 

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

export const authFailed = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
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

export const registerUser = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.put('/user/auth/regester' ,data)
        .then(res => {
            console.log(res)
            const expirationDate = new Date(new Date().getTime() + res.data.data.expiresIn);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.data.token))
            dispatch(checkAuthTimeout(res.data.data.expiresIn))
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
            const expirationDate = new Date(new Date().getTime() + res.data.data.expiresIn);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.data.token))
            dispatch(checkAuthTimeout(res.data.data.expiresIn))
        })
        .catch(err => {
            console.log(err.response.data.message)
            dispatch(authFailed(err.response.data.message))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const auth = {
            token :localStorage.getItem('token'),
        }
        if (!auth.token){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else {
                dispatch(authSuccess(auth.token))
            }
        }
    }
}