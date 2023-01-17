import React from 'react';
import classes from "./Button.module.css";
interface ButtonProps {
    text: string;
    type?: string;
    [props: string]: any
}

const Button = ({text, type = 'outline', ...rest} : ButtonProps) => {
    return (
        <button className={`${classes.btn} ${type === 'primary' ? classes.btnPrimary : classes.btnOutline}`} {...rest}>{text}</button>
    );
};

export default Button;
