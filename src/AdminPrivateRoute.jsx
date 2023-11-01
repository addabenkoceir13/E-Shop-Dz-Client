import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';

function AdminPrivateRoute({...rest}) {
    return (
        <Route 
            render = { ({props, location}) =>
                localStorage.getItem('auth_token') ?
                (<MasterLayout {...props} />) :
                (<Redirect to={{pathname: '/auth/login', state:{from:location}}} />)
            }
        />
    )
}

export default AdminPrivateRoute