import React, {useContext} from 'react';
import {Button, Layout, Menu} from "antd";
import {NavLink, Outlet} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Header from "../ui/Header";

const BaseLayout = () => {
    const {store} = useContext(Context);

    const navLinks = ['Home', 'Profile'].map((key) => ({
        key,
        label: key
    }))

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default observer(BaseLayout);
