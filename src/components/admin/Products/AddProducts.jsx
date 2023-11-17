import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import swal from 'sweetalert';

function AddProducts() {
    const [productInput, setProductInput] = useState({
        category_id:      '',
        name:             '',
        slug:             '',
        description:      '',
        meta_title:       '',
        meta_keyword:     '',
        meta_description: '',
        selling_price:   '',
        original_price:   '',
        qty:              '',
        brand:            '',
        featured:         '',
        popular:          '',
        status:           '',
    });
    const [errors, setErrors] = useState([]);
    const [productImg, setProductImg] = useState({});
    const [categoriesList, setCategoriesList] = useState([]);
    const [feactued, setFeactued] = useState(false)
    const [popular, setPopular] = useState(false)
    const [status, setStatus] = useState(false)

    useEffect(()=>{
        axios.get('api/admin/all-categories')
        .then(res => {
            if (res.data.status === 200) {
                setCategoriesList(res.data.categories)
            }
            else if (res.data.status === 400) {
                
            }
        })
        .catch(err =>{
            console.log("this is errors in catch " + err)
        });
    }, []);

    const handleInput = (e) =>
    {
        e.persist();
        setProductInput({
            ...productInput,
            [e.target.name]: e.target.value
        });
    };
    const handleCheckboxFeactued = () =>
    {
        setFeactued(!feactued)
    }
    const handleCheckboxPopular = () =>
    {
        setPopular(!popular)
    }
    const handleCheckboxStatus = () =>
    {
        setStatus(!status)
    }
    const handleImage = (e) =>
    {
        e.persist();
        setProductImg({image: e.target.files[0]});
    };

    const ProductsSubmit = (e)  => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image',productImg.image );
        formData.append('category_id',productInput.category_id );
        formData.append('name',productInput.name );
        formData.append('slug',productInput.slug );
        formData.append('description',productInput.description );
        formData.append('meta_title',productInput.meta_title );
        formData.append('meta_keyword',productInput.meta_keyword );
        formData.append('meta_description',productInput.meta_description );
        formData.append('selling_price',productInput.selling_price );
        formData.append('original_price',productInput.original_price );
        formData.append('qty',productInput.qty );
        formData.append('brand',productInput.brand );
        formData.append('featured',feactued );
        formData.append('popular',popular );
        formData.append('status',status );

        axios.post('api/admin/add-products',formData, { 
            headers: {
            'Content-Type': 'multipart/form-data'
            }})
        .then(res => {
            if (res.data.status === 200) {
                swal("Successfully", res.data.message, "success",{
                    buttons: false,
                    timer: 2500
                });
                setProductInput({
                    category_id:      '',
                    name:             '',
                    slug:             '',
                    description:      '',
                    meta_title:       '',
                    meta_keyword:     '',
                    meta_description: '',
                    selling_price:   '',
                    original_price:   '',
                    qty:              '',
                    brand:            '',
                    featured:         '',
                    popular:          '',
                    status:           '',
                });
                setErrors([]);
            } 
            else if(res.data.status === 422){
                setErrors(res.data.errors);
                swal("All fields are mandetory", 'try agin', "error",{
                    buttons: false,
                    timer: 2500
                });
            }
            else if (res.data.status === 401) {
                swal("Errors", res.data.message, "warning",{
                    buttons: false,
                    timer: 2500
                })
                setErrors([]);
            }
        })
        .catch((err) => {
            console.log('errors :' + err )
        })
        
    }

    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                <div className="cad-header p-3 d-flex justify-content-between align-items-center ">
                    <h3>Add Product</h3>
                    <Link to='/admin/view-product' className='btn btn-outline-dark'>View Product</Link>
                </div>
                <div className="card-body p-4">
                    <form encType='multipar/form-data' onSubmit={ProductsSubmit}>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState" className="form-label">Select Category</label>
                                <select  
                                    className={errors.category_id ? "form-select border border-danger" : "form-select"}
                                    id="inputState" 
                                    name='category_id' 
                                    onChange={handleInput} 
                                    defaultValue={productInput.category_id} 
                                >
                                    <option >Choose Category</option>
                                    {
                                        categoriesList.map((item) =>{
                                            return(<option key={item.id} value={item.id}>{item.name}</option>)
                                        })
                                    }
                                </select>
                                {errors.category_id && <span className='text-danger'><li>{errors.category_id}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label'>Name Product</label>
                                <input 
                                    type="text"
                                    className={errors.name ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter Name Product'
                                    name='name'
                                    onChange={handleInput}
                                    value={productInput.name} 
                                />
                                {errors.name && <span className='text-danger'><li>{errors.name}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label '>Slug</label>
                                <input 
                                    type="text"
                                    className={errors.slug ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter Slug Product'
                                    name='slug'
                                    onChange={handleInput}
                                    value={productInput.slug} 
                                />
                                {errors.slug && <span className='text-danger'><li>{errors.slug}</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4">
                                <label className='form-label' >Description</label>
                                <textarea 
                                    className={errors.description ? 'form-control border border-danger' : 'form-control'}
                                    name="description"
                                    placeholder='Enter decription product'
                                    onChange={handleInput}
                                    value={productInput.descrpition} 
                                ></textarea>
                                {errors.description && <span className='text-danger'><li>{errors.description}</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4">
                                <label  className="form_label">Meta Title</label>
                                <input 
                                    type="text"
                                    className={errors.meta_title ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter meta title'
                                    name='meta_title'
                                    onChange={handleInput}
                                    value={productInput.meta_title} 
                                />
                                {errors.meta_title && <span className='text-danger'><li>{errors.meta_title}</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4">
                                <label className='form-label' >Meta Keyword</label>
                                <textarea 
                                    className={errors.meta_keyword ? 'form-control border border-danger' : 'form-control'}
                                    name="meta_keyword" 
                                    placeholder='Enter meta Keyword'
                                    onChange={handleInput}
                                    value={productInput.meta_keyword} 
                                ></textarea>
                                {errors.meta_keyword && <span className='text-danger'><li>{errors.meta_keyword}</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4">
                                <label className='form-label' >Meta Description</label>
                                <textarea 
                                    name="meta_description" 
                                    className={errors.meta_description ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter meta description'
                                    onChange={handleInput}
                                    value={productInput.meta_description}
                                ></textarea>
                                {errors.meta_description && <span className='text-danger'><li>{errors.meta_description}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label'>Selling Price</label>
                                <input 
                                    type="tel"
                                    className={errors.selling_price ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter selling price'
                                    name='selling_price'
                                    onChange={handleInput}
                                    value={productInput.selling_price} 
                                />
                                {errors.selling_price && <span className='text-danger'><li>{errors.selling_price}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label'>Original Price</label>
                                <input 
                                    type="tel"
                                    className={errors.original_price ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter original price'
                                    name='original_price'
                                    onChange={handleInput}
                                    value={productInput.original_price} 
                                />
                                {errors.original_price && <span className='text-danger'><li>{errors.original_price}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label '>Quantity</label>
                                <input 
                                    type="number"
                                    className={errors.qty ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter Quantity'
                                    min={0}
                                    name='qty'
                                    onChange={handleInput}
                                    value={productInput.qty} 
                                />
                                {errors.qty && <span className='text-danger'><li>{errors.qty}</li></span>}
                            </div>
                            <div className="form-group col col-sm-12 col-md-4">
                                <label  className='form-label'>Brand</label>
                                <input 
                                    type="text"
                                    className={errors.brand ? 'form-control border border-danger' : 'form-control'}
                                    placeholder='Enter Brand'
                                    name='brand'
                                    onChange={handleInput}
                                    value={productInput.brand} 
                                />
                                {errors.brand && <span className='text-danger'><li>{errors.brand}</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4 ">
                                <label className="form-label">Image</label>
                                <input 
                                    type="file" 
                                    className={errors.image ? 'form-control border border-danger' : 'form-control'} 
                                    name="image"
                                    onChange = {handleImage}
                                />
                                {errors.image && <span className='text-danger'><li>{errors.image }</li></span>}
                            </div>
                            <div className="form-group col-12 col-md-4 mt-4">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor='featuredcheck' >Feactured (Checked=shown)</label>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id='featuredcheck' 
                                        name='featured'
                                        checked={feactued}
                                        onChange={handleCheckboxFeactued}
                                        value={productInput.featured}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-4 mt-4">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor='popularcheck' >Popular (checked=shown)</label>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id='popularcheck'
                                        name='popular'
                                        onChange={handleCheckboxPopular}
                                        value={productInput.popular}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-4 mt-4">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor='statuscheck' >Status (checked=Hidden)</label>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id='statuscheck' 
                                        name='status'
                                        onChange={handleCheckboxStatus}
                                        value={productInput.status}
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-3 mt-5">
                                <button className="btn btn-primary">Add Product</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProducts