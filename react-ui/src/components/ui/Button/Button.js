import React from 'react';
import classes from "./Button.module.css";

const Button = ({text, type, ...rest}) => {
    return (
        <button className={`${classes.btn} ${type === 'primary' ? classes.btnPrimary : classes.btnOutline}`} {...rest}>{text}</button>
    );
};

Button.defaultProps = {
    type: 'outline'
}

export default Button;