import React,{useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import instance from '../axios/axios';
import FormContainer from '../components/FormContainer/FormContainer'
import Loader from '../components/Loader/Loader'
import Message from '../Message/Message'
import { listProductDetails, updateProduct } from '../redux/Product/productActions';
import { PRODUCT_UPDATE_RESET } from '../redux/Product/productTypes';

function ProductEditScreen({history}) {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            if(successUpdate){
                dispatch({ type: PRODUCT_UPDATE_RESET })
                history.push('/admin/productlist')
            }else{
                if(!product.name || product._id !== id){
                    dispatch(listProductDetails(id))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setImage(product.image)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }    
            }
        }else{
            history.push(`/login`)
        }
        
    },[product,id,dispatch,history,userInfo,successUpdate]);
    
    const uploadHandle = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await instance.post('/api/upload', formData, config)
            
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandle = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }
    return (
        <>
            <Link to={`/admin/productlist`} className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandle}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=> setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e=> setPrice(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image or Image URL</Form.Label>
                                <Form.Control type="text" placeholder="Enter Image url" value={image} onChange={e=> setImage(e.target.value)}></Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadHandle}>
                        </Form.File>
                        {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e) =>setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category}  onChange={(e) => setCategory(e.target.value)} ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
