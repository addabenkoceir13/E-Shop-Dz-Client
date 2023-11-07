import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import '../../assets/admin/js/scripts'

function Nav() {

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const logout = (e) =>
    {
        setLoading(true)
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            localStorage.removeItem('auth_token', res.data.token);
            localStorage.removeItem('auth_name', res.data.username);
            swal("Successfully",res.data.message, "success",
            {
            buttons: false,
            timer: 3000,
            });
            history.push('/auth/login')
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            },2500)
        });
    }
    if (loading) {
        return(
            <>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner"></div>
                </div>
            </>
        )
    }
    return (
        <>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <Link to="#" className="navbar-brand ps-3">E-Shop DZ Dashboard</Link>
            {/* <!-- Sidebar Toggle--> */}
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" >
                <i className="fas fa-bars"></i> 
            </button>
            {/* <!-- Navbar Search--> */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link to="#" className="dropdown-item" >Settings</Link></li>
                        <li><Link to="#" className="dropdown-item" >Activity Log</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><p onClick={logout} className="dropdown-item cursor-pointer" >Logout</p></li>
                    </ul>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Nav;