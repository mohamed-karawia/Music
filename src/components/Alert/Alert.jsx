import React from 'react';
import classes from './Alert.module.scss';

const Alert = (props) => {
    const closeAlert = () => {
        props.closeAlert()
    }
    
    return (
        <div className={classes.Alert}>
            <h2>{props.alert}</h2>
            <button onClick={closeAlert} className={classes.Alert__close}>Close</button>
        </div>
    )
}

export default Alert
