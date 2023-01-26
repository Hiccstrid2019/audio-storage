import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';
import AccountIcon from './account.svg'
import {useAppSelector} from "../../hoc/redux";

function Header() {
    const {isAuth, username} = useAppSelector(state => state.userReducer);

    return (
        <header className="header">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/project'>My records</NavLink>


            <div className="profile-link">
                <img src={AccountIcon}/>
                {!isAuth ? (
                    <NavLink to='/login'>Login</NavLink>
                ) : (
                    <NavLink to='/profile'>{username}</NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;
