import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';

function Navbar() {
    const history = useHistory();
    const logout = (e) =>
    { 
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("Successfully",res.data.message, "success",
                {
                buttons: false,
                timer: 3000,
                });
                history.push('/auth/login')
            }
        });
        // history.push('/');
    }

    
    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top fs-5 " data-bs-theme="dark">
                <div className="container">
                    <Link to={`/`} className="navbar-brand" >E-Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarScroll">
                        <ul className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll" style={{bsScrollHeight: 100}}>
                            <li className="nav-item">
                                <Link to={`/`} className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/`} className="nav-link" >Link</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={`/`} className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Link
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link to={`/`} className="dropdown-item" >Action</Link></li>
                                    <li><Link to={`/`} className="dropdown-item" >Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to={`/`} className="dropdown-item" >Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={`/`} className="nav-link disabled" aria-disabled="true">Link</Link>
                            </li>
                        </ul>
                        <div className="d-flex" >
                            {
                                !localStorage.getItem('auth_token') ?
                                <>
                                <div>
                                    <Link to={`/auth/register`} className='btn btn-light mx-2'>Sign Up</Link>
                                    <Link to={`/auth/login`} className='btn btn-success'>Log In</Link>
                                </div>
                                </>
                                :
                                <>
                                <div className="dropdown">
                                    <Link className="btn btn-dark dropdown-toggle" to={`/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown link
                                    </Link>

                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to={`/`}>Action</Link></li>
                                        <li><Link className="dropdown-item" to={`/`}>Another action</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li ><p className="dropdown-item cursor-pointer" onClick={logout}>Log Out</p></li>
                                    </ul>
                                </div>
                                </>
                            }

                            {/* <div>
                                <Link to={`/auth/register`} className='btn btn-light mx-2'>Sign Up</Link>
                                <Link to={`/auth/login`} className='btn btn-success'>Log In</Link>
                            </div> */}
                            {/* <div class="dropdown">
                                <Link class="btn btn-dark dropdown-toggle" to={`/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </Link>

                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to={`/`}>Action</Link></li>
                                    <li><Link class="dropdown-item" to={`/`}>Another action</Link></li>
                                    <li><Link class="dropdown-item" to={`/`}>Something else here</Link></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar