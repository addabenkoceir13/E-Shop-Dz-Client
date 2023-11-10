import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'

function ViewCategory() {

  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([])

  useEffect(()=> {
    axios.get('/api/admin/view-category').then(res => {
      if (res.status === 200) 
      {
        setCategoryList(res.data.category)  
      }
      setLoading(false)
    });
  }, [])

  if (loading) 
  {
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner"></div>
        </div>
    ) 
  }
  else
  {
    var viewcategory_HTMLTABLE = 
    categoryList.map( (item) => {
      return(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>{item.meta_title}</td>
          <td>
            <Link to={`/admin/edit-category/${item.id}`} className='btn btn-success mx-2'><FiEdit /></Link>
            <Link to={`/admin/delete-category/${item.id}`} className='btn btn-outline-danger'><AiOutlineDelete /></Link>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='card mt-4'>
      <div className="card-header d-flex justify-content-between">
        <h2>Categories List</h2>
          <Link to='/admin/add-category' className='btn btn-outline-dark'> Add new category</Link>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr className="table-dark">
              <th >#</th>
              <th >Name</th>
              <th >Slug</th>
              <th >Status</th>
              <th >Meta Title</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {viewcategory_HTMLTABLE}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewCategory