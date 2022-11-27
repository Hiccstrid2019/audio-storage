import './App.css';
import {Button, Row} from 'antd';
import LoginForm from "./components/LoginForm";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register";

function App() {
    const {store} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    },[]);

    if (store.isLoading) {
        return <div>Loading....</div>
    }
    if (!store.isAuth) {
        return (
            <div className="App">
                <Row justify="center" align="middle" style={{height: "100vh"}}>
                    <Routes>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </Row>
            </div>
        )
    }
  return (
      <div className="App">
          <h1>You authorized</h1>
          <Button type="primary" onClick={() => store.logout()}>Logout</Button>
      </div>
  );
}

export default observer(App);
