import {useLocation, Navigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const RequireAuth = ({isAuth, children}) => {
    const location = useLocation();

    return (
        <>
            {!isAuth ? <><Navigate to='/login' state={{from: location}} replace/></>: children}
        </>
    )
}

export default observer(RequireAuth);
