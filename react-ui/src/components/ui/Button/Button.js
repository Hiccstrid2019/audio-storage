import React from 'react';
import classes from "./Button.module.css";

const Button = ({text, ...rest}) => {
    return (
        <button className={classes.btn} {...rest}>{text}</button>
    );
};

export default Button;