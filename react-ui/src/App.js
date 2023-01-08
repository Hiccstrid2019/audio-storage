import './App.css';
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./components/pages/Profile";
import BaseLayout from "./components/pages/BaseLayout";
import Homepage from "./components/pages/Homepage";
import AudioStorage from "./components/pages/AudioStorage";
import LessonPage from "./components/pages/LessonPage";

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
  return (
      <>
          <Routes>
              <Route path='/' element={<BaseLayout/>}>
                  <Route index element={<Homepage/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/profile' element={
                      <RequireAuth isAuth={store.isAuth}>
                          <Profile/>
                      </RequireAuth>
                  }/>
                  <Route path='/audio' element={
                      <RequireAuth isAuth={store.isAuth}>
                          <AudioStorage/>
                      </RequireAuth>
                  }/>
                  <Route path='/audio/:id' element={
                      <RequireAuth isAuth={store.isAuth}>
                          <LessonPage/>
                      </RequireAuth>
                  }/>
              </Route>

          </Routes>
      </>
  );
}

export default observer(App);
