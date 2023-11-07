import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';

function Category() {
    const [categoryInput, setCatergoryInput] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_ceywords: '',
        meta_description: '',
        error_list: []
    })
    const handleInput = (e) => {
        e.persist();
        setCatergoryInput({
            ...categoryInput, 
            [e.target.name]: e.target.value
        })
    }
    const SubmitAddCategory = (e) => {
        e.preventDefault()
        const data = {
            slug        : categoryInput.slug,
            name        : categoryInput.name,
            description : categoryInput.description,
            status      : categoryInput.status,
            meta_title  : categoryInput.meta_title,
            meta_ceywords    : categoryInput.meta_ceywords,
            meta_description : categoryInput.meta_description,
        }

        axios.post('/api/admin/store-category', data).then(res => {
            console.log('response', res);
            if (res.data.status === 200) 
            {
                swal("Successfully", res.data.message, "success",{
                    buttons: false,
                    timer: 2500
                })
                document.getElementById('CATEGORY_FORM').reset();
            } 
            else if(res.data.status === 400)
            {
                setCatergoryInput({...categoryInput, error_list:res.data.errors})
            }
        })
    }
    
    return (
        <div className='container-fluid px-4'>
            <h1 className="my-4">Add Category</h1>
            <form onSubmit={SubmitAddCategory} id='CATEGORY_FORM'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                    </li>
                </ul>
                <div className="tab-content bg-light p-3" id="myTabContent">
                    {categoryInput.error_list.meta_title && <div className="text-danger" role='alert'> 
                            <li>{categoryInput.error_list.meta_title}</li>
                    </div>}
                    {categoryInput.error_list.slug && <div className="text-danger" role='alert'> 
                            <li>{categoryInput.error_list.slug}</li>
                    </div>}
                    {categoryInput.error_list.name && <div className="text-danger" role='alert'> 
                            <li>{categoryInput.error_list.name}</li>
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
                                value={categoryInput.description} 
                            ></textarea>
                        </div>
                        <div className="form-check col-12 col-sm-12 col-md-6 mb-3 pl-5">
                            <p className='fw-bold' >Status</p>
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="flexCheckDefault"
                                onChange={handleInput}
                                value={categoryInput.status} 
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
                        <button className="btn btn-outline-primary mt-3">Add new category</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Category