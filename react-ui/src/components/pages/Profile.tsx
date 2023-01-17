import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hoc/redux";
import {logout} from "../../store/reducers/UserActions";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/', {replace: true});
    }

    return (
        <div>
            <h1>User profile private info</h1>
            <button onClick={() => handleLogout()}>Exit</button>
        </div>
    );
};

export default Profile;
