import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hoc/redux";
import {login} from "../../store/reducers/UserActions";
import {useState} from "react";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import classes from './Login.module.css';

const Login = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fromPage = location.state?.from?.pathname || '/';

    const handleForm = () => {
        dispatch(login({email, password}));
        navigate(fromPage)
    };

    return (
        <div className={classes.container}>
            <Input autoFocus text='Email' setValue={setEmail}/>
            <Input text='Password' setValue={setPassword}/>
            <Button text='Login' onClick={() => handleForm()}/>
            Yet don't have account? <Link to='/register'>Register</Link>
        </div>
    );
};

export default Login;
