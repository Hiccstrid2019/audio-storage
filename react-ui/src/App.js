import './App.css';
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./components/Profile";
import BaseLayout from "./components/BaseLayout";
import Homepage from "./components/Homepage";
import AudioStorage from "./components/AudioStorage";
import LessonPage from "./components/LessonPage";

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
                      <RequireAuth>
                          <Profile/>
                      </RequireAuth>
                  }/>
                  <Route path='/audio' element={
                      <RequireAuth>
                          <AudioStorage/>
                      </RequireAuth>
                  }/>
                  <Route path='/audio/:id' element={
                      <RequireAuth>
                          <LessonPage/>
                      </RequireAuth>
                  }/>
              </Route>

          </Routes>
      </>
  );
}

export default observer(App);
