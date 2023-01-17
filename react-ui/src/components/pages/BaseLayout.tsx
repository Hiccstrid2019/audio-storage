import React, {useContext} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Header from "../ui/Header";

const BaseLayout = () => {

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default BaseLayout;
