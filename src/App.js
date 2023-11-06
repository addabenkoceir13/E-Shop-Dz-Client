import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute';
import NPage403 from './components/errors/NPage403';
import NPage404 from './components/errors/NPage404';

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.headers.post["Accept"]       = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
})

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/*----------------- Start Frontend page ------------------------------------------ */}
            <Route path='/' exact component={Home} />

            <Route path="/403" component={NPage403} />
            <Route path="/404" component={NPage404} />

            <Route path='/auth/login'>
              {localStorage.getItem('auth_token') ? <Redirect to='/' />  : <Login />}
            </Route>
            <Route path='/auth/register'>
              {localStorage.getItem('auth_token') ? <Redirect to='/' />  : <Register />}
            </Route>
          {/*----------------- End Frontend page -------------------------------------------- */}

          {/*----------------- Start admin dashboard  --------------------------------------- */}
            {/* <Route path="/admin" name='Admin' render={(props) => <MasterLayout {...props}/>}  /> */}
            <AdminPrivateRoute path="/admin" name='Admin' />
          {/*----------------- End admin dashboard ------------------------------------------ */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
