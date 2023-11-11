import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link , useHistory} from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';


function ViewCategory() {

  const history = useHistory
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [deleteId, setDeleteID] = useState({
    id: '',
    name: ''
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    axios.get('/api/admin/view-category').then(res => {
      if (res.status === 200) 
      {
        setCategoryList(res.data.category)  
      }
      setLoading(false)
    });
  }, [])

  const handleClickDelete = (id, name) =>
  {
    setDeleteID({id:id, name:name})
    setShow(true)
  }

  const deleteCategory = (e, id) =>
  {
    e.preventDefault();
    axios.delete(`api/admin/deleted-category/${id}`).then(res =>{
      setShow(false)
      if (res.data.status === 200) {
        swal("Success!", res.data.message, "success",{
          buttons: false,
          timer: 3000
        });
        setTimeout(() =>{
          window.location.reload();
        },2800)
        // history.push('/admin/view-category');
      }
      else if (res.data.status === 404) {
        swal("unsuccess!", res.data.message, "error",{
          buttons: false,
          timer: 3000
        });
      }
    })
  }
  
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
            <button type="button" className="btn btn-outline-danger" onClick={() => {handleClickDelete(item.id, item.name); handleShow()}}>
              <AiOutlineDelete />
            </button>
          </td>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Deleted Category id: {deleteId.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are sure deleted this category { deleteId.name}  ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button  className="btn btn-danger" onClick={(e) => deleteCategory(e, deleteId.id)}>
                Deleted
              </Button>
            </Modal.Footer>
          </Modal>
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