import React, { useEffect, useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';

function AdminPrivateRoute({...rest}) {

    const history = useHistory();
    
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading]             = useState(true);

    useEffect(() => {
        axios.get('api/checkingAuthenticated').then(res => {
            if (res.status === 200) 
            {
                setAuthenticated(true)
            }
            setLoading(false)
        });
        return () => {
            setAuthenticated(false)
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status  === 401) {
            console.log("error admin not found")
            swal("Unauthorized", err.response.data.massage, "warning",{
                buttons: false,
                timer:2000
            });
            history.push('/')
        }
        return Promise.reject(err)
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function(error) 
        {
            if (error.response.status === 403) // Access Denied
            {
                swal("Fordedden", error.response.data.message, "warning",{
                    buttons: false,
                    timer:2000
                });
                history.push('/403');
            }
            else if (error.response.status === 404) // Page Not found
            {
                swal("404 Error", "Url/Page Not Found" , "warning",{
                    buttons: false,
                    timer:2000
                });
                history.push('/404');
            }
            return Promise.reject(error)
        }
    )

    if (loading) 
    {
        return(
            <>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner"></div>
                </div>
            </>
        ) 
        
    }

    return (
        <Route {...rest}
            render = 
            { 
                ({props, location}) =>
                Authenticated ?
                (<MasterLayout {...props} />) :
                (<Redirect to={{pathname: '/auth/login', state:{from:location}}} />)
            }
        />
    )
}

export default AdminPrivateRoute