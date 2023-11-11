import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory(props) 
{
    const history = useHistory();
    const category_id = props.match.params.id;
    const [loading, setLoading] = useState(false);
    const [categoryInput, setCategoryInput] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(()=>
    {
        setLoading(true)
        axios.get(`/api/admin/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setLoading(false)
                setCategoryInput(res.data.category)
            } 
            else if(res.data.status === 404)
            {
                setLoading(false)
                swal("Error 404", res.data.message, "error",{
                    button: false,
                    timer: 3000,
                })
                history.push('/admin/view-category');
            }
        })
    },[props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({
            ...categoryInput, 
            [e.target.name]: e.target.value
        });
    };

    const updateCategory = (e) =>
    {
        e.preventDefault()
        const category_id = props.match.params.id;
        const data = categoryInput;
        
        axios.put(`api/admin/update-category/${category_id}`, data).then(res =>
            {
            console.log(res.data);
            if(res.data.status == 200)
            {
                swal("Success!", res.data.message, "success",{
                    buttons: false,
                    timer: 3000
                });
                setTimeout(() => {history.goBack()},1500);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mandetory", "Required", "warning",{
                    buttons: false,
                    timer: 3000
                })
                setErrors(res.data.errors)
            }
            else if(res.data.status === 404)
            {
                swal("Failed!", res.data.message, "error",{
                    buttons: false,
                    timer: 3000
                })
                history.push('/admin/view-category')
            }
        }).catch((err)=>{
            console.log(err);
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
    return (
        <div className='container-fluid px-4'>
            <h1 className="my-4">Edit Category</h1>
            <form onSubmit={updateCategory}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                    </li>
                </ul>
                <div className="tab-content bg-light p-3" id="myTabContent">
                    {errors.meta_title && <div className="text-danger" role='alert'> 
                            <li>{errors.meta_title}</li>
                    </div>}
                    {errors.slug && <div className="text-danger" role='alert'> 
                            <li>{errors.slug}</li>
                    </div>}
                    {errors.name && <div className="text-danger" role='alert'> 
                            <li>{errors.name}</li>
                    </div>}
                    <div className="tab-pane card-body border fade show active p-2" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <div className="row">
                        <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                            <label className="form-label fw-bold">Slug</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name='slug'
                                onChange={handleInput}
                                value={categoryInput.slug} 
                            />
                        </div>
                        <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                            <label className="form-label fw-bold">Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name='name'
                                onChange={handleInput}
                                value={categoryInput.name} 
                            />
                        </div>
                        <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                            <label className="form-label fw-bold">Description</label>
                            <textarea 
                                className="form-control"
                                name='description'
                                onChange={handleInput}
                                value={categoryInput.desription} 
                            ></textarea>
                        </div>
                        <div className="form-check col-12 col-sm-12 col-md-6 mb-3 pl-5">
                            <p className='fw-bold' >Status</p>
                            <input 
                                type = 'checkbox'
                                className="form-check-input" 
                                name='stats'
                                id="flexCheckDefault"
                                onChange={handleInput}
                                value={categoryInput.stats} 
                                
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Status
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade p-2" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" tabIndex="0">
                        <div className="row">
                            <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                                <label className="form-label">Meta Title</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name='meta_title'
                                    onChange={handleInput}
                                    value={categoryInput.meta_title} 
                                />
                            </div>
                            <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                                <label className="form-label">Meta Ceywords</label>
                                <textarea 
                                    className="form-control"
                                    name='meta_ceywords'
                                    onChange={handleInput}
                                    value={categoryInput.meta_ceywords} 
                                ></textarea>
                            </div>
                            <div className="form-group col-12 col-sm-12 col-md-6 mb-3">
                                <label className="form-label">Meta Description</label>
                                <textarea 
                                    className="form-control"
                                    name='meta_description'
                                    onChange={handleInput}
                                    value={categoryInput.meta_description}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary mt-3">Update category</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCategory