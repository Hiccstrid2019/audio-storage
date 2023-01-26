import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./components/pages/Profile";
import BaseLayout from "./components/pages/BaseLayout";
import Homepage from "./components/pages/Homepage";
import ProjectStorage from "./components/pages/ProjectStorage";
import ProjectPage from "./components/pages/ProjectPage";
import {useAppDispatch, useAppSelector} from "./hoc/redux";
import {checkAuth} from "./store/reducers/UserActions";

function App() {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.userReducer);
    useEffect(() => {
        dispatch(checkAuth());
    },[]);
    if (isLoading) {
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
                  <Route path='/project' element={
                      <RequireAuth>
                          <ProjectStorage/>
                      </RequireAuth>
                  }/>
                  <Route path='/project/:id' element={
                      <RequireAuth>
                          <ProjectPage/>
                      </RequireAuth>
                  }/>
              </Route>

          </Routes>
      </>
  );
}

export default App;
