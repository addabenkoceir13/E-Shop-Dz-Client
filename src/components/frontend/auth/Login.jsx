import React, { useEffect, useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import Navbar from '../navigation/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
    errorMessage:  []
  });
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleInput = (e) =>
  {
    e.persist();
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
  const LoginSubmit = (e) => 
  {
    setLoading(true);
    e.preventDefault();
    const data = {
      email: login.email,
      password: login.password
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/auth/login', data).then((res) => 
      {
        if (res.data.status === 200) 
        {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Successfully",res.data.message, "success",
          {
            buttons: false,
            timer: 3000,
          });
          if(res.data.role === 'admin')
          {
            history.push('/admin')
          }
          else
          {
            history.push('/');
          }
          setLoading(false);
        }
        else if(res.data.status === 401)
        {
          swal("Unsuccessfully",res.data.message, "error",
          {
            buttons: false,
            timer: 3000,
          });
          setLoading(false);
        }
        else
        {
          setLogin({
            ...login,
            errorMessage: res.data.validation_errosr
          })
          setLoading(false);

        }
      });
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
      <div className='login'>
        <Navbar />
          <div className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-4 p-md-5">
                      <h3 className="mb-4 pb-md-0 mb-md-5 fw-semibold text-center">Log In</h3>
                      <form onSubmit={LoginSubmit}>
                        <div className="from-group mb-3 form-outline form-white mb-4">
                          <label  className="form-label fw-semibold">Email Address</label>
                          <input 
                            type="email"  
                            className='form-control'
                            name='email'
                            placeholder='Enter your Email'
                            onChange={handleInput}
                          />
                          {login.errorMessage.email && <span className='text-bg-danger px-2 mt-3 mx-2'>{login.errorMessage.email}</span>}
                        </div>
                        <div className="from-group mb-3 form-outline form-white mb-4">
                          <label  className="form-label fw-semibold">Password</label>
                          <div className="w-100 position-relative">
                            <input 
                              type={visible ? 'text' : 'password'}  
                              className='form-control'
                              name='password'
                              placeholder='Enter your Email'
                              value={passwordVisible}
                              onChange={(e)=>{
                                setPasswordVisible(e.target.value);
                                handleInput(e);
                              }
                              } 
                            />
                            <span className='position-absolute top-0 end-0  mh-100 fs-5 mx-2 mt-1 cursor-pointer' onClick={() => setVisible(!visible)}>
                              {visible ?  <AiOutlineEye /> :  <AiOutlineEyeInvisible /> }
                            </span>
                          </div>
                          {login.errorMessage.password && <span className='text-bg-danger px-2 mt-3 mx-2'>{login.errorMessage.password}</span>}
                        </div>
                        <div className="d-grid gap-2">
                          <button type='submit' className='btn btn-primary'>Log In</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Login