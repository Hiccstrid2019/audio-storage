import {useLocation, Navigate} from "react-router-dom";
import React from "react";
import {useAppSelector} from "./redux";

interface RequireAuthProps {
    children: React.ReactNode
}

const RequireAuth = ({children}: RequireAuthProps) => {
    const location = useLocation();
    const {isAuth} = useAppSelector(state => state.userReducer);

    return (
        <>
            {!isAuth ? <><Navigate to='/login' state={{from: location}} replace/></>: children}
        </>
    )
}

export default RequireAuth;
