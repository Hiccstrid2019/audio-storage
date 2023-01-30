import React, {useState} from 'react';
import {registration} from "../../store/reducers/UserActions";
import classes from "./Login.module.css";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import {useAppDispatch} from "../../hoc/redux";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleForm = () => {
        dispatch(registration({email, password, username}));
        navigate('/');
    };

    return (
        <div className={classes.container}>
            <Input text='Email' setValue={setEmail}/>
            <Input text='Username' setValue={setUsername}/>
            <Input text='Password' setValue={setPassword}/>
            <Button text='Register' onClick={() => handleForm()}/>
        </div>
    );
}

export default Register;
