import React, {useContext} from 'react';
import {Button, Layout, Menu} from "antd";
import {NavLink, Outlet} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
const { Header, Content, Sider } = Layout;

const BaseLayout = () => {
    const {store} = useContext(Context);

    const navLinks = ['Home', 'Profile'].map((key) => ({
        key,
        label: key
    }))

    return (
        <Layout className="layout">
            <Header>
                <Menu mode='horizontal' theme='light'>
                    <Menu.Item>
                        <NavLink to='/'>Home</NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to='/profile'>Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        {!store.isAuth ? (
                            <Button type='primary'>
                                <NavLink to='/login'>Login</NavLink>
                            </Button>
                        ) : (
                            <Button type='primary' onClick={() => store.logout()}>
                                Logout
                            </Button>
                        )}
                    </Menu.Item>
                </Menu>
                {/*<Link to='/'>Home</Link>*/}
                {/*<Link to='/profile'>Profile</Link>*/}
                {/*{!store.isAuth ? (*/}
                {/*    <Button type='primary'>*/}
                {/*        <Link to='/login'>Login</Link>*/}
                {/*    </Button>*/}
                {/*) : (*/}
                {/*    <Button type='primary' onClick={() => store.logout()}>*/}
                {/*        Logout*/}
                {/*    </Button>*/}
                {/*)}*/}
            </Header>

            <Outlet/>

        </Layout>
    );
};

export default observer(BaseLayout);
