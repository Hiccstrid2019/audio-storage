import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";

const Profile = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    return (
        <div>
            <h1>User profile private info</h1>
            <button onClick={() => store.logout(() => navigate('/', {replace: true}))}>Exit</button>
        </div>
    );
};

export default Profile;
