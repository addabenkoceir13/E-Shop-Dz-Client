import React from 'react'
import {BiSolidError} from 'react-icons/bi'
function NPage404() {
  return (
    <div className='container'>
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body text-center p-5">
                        <span className='text-danger' style={{fontSize: 100}}><BiSolidError /></span>
                        <h1 className="tcard-text">Page 404 | Page Not Found</h1>
                        <h3>Url / Page you are searching not found</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NPage404