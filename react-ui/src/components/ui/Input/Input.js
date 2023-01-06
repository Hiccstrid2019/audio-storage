import React from 'react';
import classes from "./Imput.module.css";

const Input = ({text, setValue}) => {
    return (
        <div>
            <input className={classes.input} placeholder={text} onChange={event => setValue(event.target.value)}/>
        </div>
    );
};

export default Input;