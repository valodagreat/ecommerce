import React,{ useEffect} from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Paginate from '../components/Paginate/Paginate';
import Message from '../Message/Message';
import { createProduct, deleteProduct, listProducts } from '../redux/Product/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/Product/productTypes';

function ProductListScreen({history}) {
    const dispatch = useDispatch()
    const {pageNumber} = useParams();

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct } = productCreate

    useEffect(() =>{
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        if(!userInfo || !userInfo.isAdmin){
            history.push(`/login`)
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber || 1))
        }
    },[dispatch,userInfo,history,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete")){
            dispatch(deleteProduct(id))
        }
        
    }
    const createProductHandle = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className="align-items-center" >
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right" >
                    <Button className="my-3" onClick={createProductHandle} >
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(product =>(
                                <tr key={product._id} >
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`} >
                                            <Button className="btn-sm" variant="light">
                                                <i className="fas fa-edit" style={{color: 'blue'}} ></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={()=>{
                                            deleteHandler(product._id);
                                        }}>
                                            <i className="fas fa-trash"  ></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
                <Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin} />
                </>
            )}
        </>
    )
}

export default ProductListScreen