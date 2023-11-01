import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Nav from './Nav';
import Sidebar from './Sidebar';
import Footer from './Footer';

import routes from '../../routes/Routes';

function MasterLayout() {
    return (
        <div className='sb-nav-fixed'>
            <Nav />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <Switch>
                                {
                                    routes.map((route, idx) => {
                                        return(
                                            route.component && (
                                                <Route 
                                                    key={idx}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    render={(props) =>(
                                                        <route.component {...props}/>
                                                    )}
                                                />
                                            )
                                        )
                                        
                                    })
                                }
                                <Redirect from="/admin" to='/admin/dashboard'  />
                            </Switch>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MasterLayout