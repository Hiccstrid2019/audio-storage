import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import './Header.css';
import AccountIcon from './account.svg'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

function Header(props) {
    const {store} = useContext(Context);

    return (
        <header className="header">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/audio'>My records</NavLink>


            <div className="profile-link">
                <img src={AccountIcon}/>
                {!store.isAuth ? (
                    <NavLink to='/login'>Login</NavLink>
                ) : (
                    <NavLink to='/profile'>{store.user.name}</NavLink>
                )}
            </div>
        </header>
    );
}

export default observer(Header);