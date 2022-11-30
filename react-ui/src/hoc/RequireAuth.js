import {useLocation, Navigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const RequireAuth = ({children}) => {
    const location = useLocation();
    const {store} = useContext(Context);

    if (store.isLoading) {
        return <div>Loading....</div>
    }

    if (!store.isAuth) {
        return <Navigate to='/login' state={{from: location}}/>
    }
    return children;
}

export default observer(RequireAuth);
