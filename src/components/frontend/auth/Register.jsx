import React, { useState } from 'react'
import './auth.css';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import axios from 'axios';
import swal from 'sweetalert';
function Register() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    
  });
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    error_list: []
  });

  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfPassword, setVisibleConfPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleValidation = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }
  const SubmitPassword = (e) => {
    e.preventDefault();
    const errors = {};
    if (password !== confirmPassword) {
      errors.password = "This Password did't match";
      swal("Error" , errors.password,"error",{
        button: false,
        timer: 2500
      })
    }
    return errors;
  }
  const handelInput = (e) =>{
    e.persist();
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
      confPassword: register.confPassword
    }
    if (register.password === register.confPassword) {
      console.table(data)
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/auth/register`, data).then(res =>{
          if (res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token)
            localStorage.setItem('auth_name', res.data.username)
            swal("Successfully",res.data.message, "success",
            {
              buttons: false,
              timer: 3000,
            });
            history.push('/');
          } 
          else {
            setRegister({
              ...register,
              error_list: res.data.validation_errors
            })
          }
        }); 
      });
    } 
    else {
      console.log("pass not match")
    }
  }
  

  
  return (
    <div className='register'>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 fw-semibold text-center">Registration </h3>
                  <form onSubmit={(e) =>{ SubmitPassword(e); registerSubmit(e); }}>
                    <div className="from-group mb-3">
                      <label className='form-label fw-semibold'>Full Name</label>
                      <input 
                        type="text"
                        className={'form-control'} 
                        name='name' 
                        placeholder='Enter your full name'
                        value={register.name}
                        onChange={(e) => handelInput(e)}
                        
                      />
                      {register.error_list.name && <span className='m-2 mt-5 px-1 text-bg-danger'>{register.error_list.name}</span>}
                    </div>
                    <div className="from-group mb-3">
                      <label className='form-label fw-semibold'>Email</label>
                      <input 
                        type="email" 
                        className={'form-control'}  
                        name='email' 
                        placeholder='Enter your email'
                        value={register.email}
                        onChange={(e) => handelInput(e)}
                      />
                      {register.error_list.email && <span className='m-2 mt-5 px-1 text-bg-danger'>{register.error_list.email}</span>}
                    </div>
                    <div className="from-group mb-3">
                        <label className='form-label fw-semibold'>Password</label>
                      <div className='w-100 position-relative'>
                        <input 
                          type={visiblePassword ? 'text' : 'password'} 
                          className={'form-control'} 
                          name='password' 
                          placeholder='Enter your password'
                          onChange={(e) => {
                            setPassword(e.target.value);
                            handleValidation(e);
                            handelInput(e);
                          }}
                          value={password}
                        />
                        <span className='position-absolute top-0 end-0  mh-100 fs-5 mx-2 mt-1 cursor-pointer' 
                          onClick={() => setVisiblePassword(!visiblePassword)}>
                          {visiblePassword ?  <AiOutlineEye /> :  <AiOutlineEyeInvisible /> }
                        </span>
                      {register.error_list.password && <span className='m-2 mt-5 px-1 text-bg-danger'>{register.error_list.password}</span>}
                      </div>
                    </div>
                    <div className="from-group mb-3">
                      <label className='form-label fw-semibold'>Confirm Password</label>
                      <div className="w-100 position-relative">
                        <input 
                          type={visibleConfPassword ? 'text' : 'password'}  
                          className={'form-control'}  
                          name='confPassword' 
                          placeholder='Enter your confirm password'
                          onChange={(e)=>{
                            setConfirmPassword(e.target.value);
                            handleValidation(e);
                            handelInput(e)
                          }}
                          value={confirmPassword}
                        />
                        <span className='position-absolute top-0 end-0  mh-100 fs-5 mx-2 mt-1 cursor-pointer' onClick={() => setVisibleConfPassword(!visibleConfPassword)}>
                          {visibleConfPassword ?  <AiOutlineEye /> :  <AiOutlineEyeInvisible /> }
                        </span>
                      {register.error_list.password && <span className='m-2 mt-5 px-1 text-bg-danger'>{register.error_list.password}</span>}
                      </div>
                    </div>
                    {errors.password && <div className="alert alert-danger" role='alert'>{errors.password}</div>}
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register