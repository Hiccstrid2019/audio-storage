import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import LoginForm from "./components/LoginForm";
import {useContext} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

function App() {
    const {store} = useContext(Context);
    if (!store.isAuth) {
        return <LoginForm/>
    }
  return (
      <>
          <h1>You authorized</h1>
      </>
  );
}

export default observer(App);
