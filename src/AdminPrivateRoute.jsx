import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';

function AdminPrivateRoute({...rest}) {

    axios.get('api/checkingAuthenticated').then(res => {
        console.log("Admin Private Route", res);
    });
    return (
        <Route 
            render = 
            { 
                ({props, location}) =>
                localStorage.getItem('auth_token') ?
                (<MasterLayout {...props} />) :
                (<Redirect to={{pathname: '/auth/login', state:{from:location}}} />)
            }
        />
    )
}

export default AdminPrivateRoute