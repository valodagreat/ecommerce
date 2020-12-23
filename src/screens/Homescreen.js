import React,{useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Product from '../components/Product/Product';
import Message from '../Message/Message';
import { listProducts } from '../redux/Product/productActions';

function Homescreen() {

    const dispatch = useDispatch()
    const {keyword} = useParams();
    
    const productList = useSelector(state => state.productList)
    const {products,loading,error} = productList

    useEffect(() => {
        
        dispatch(listProducts(keyword));
    }, [dispatch,keyword])
    
    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <Row>
            {products?.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} />
                </Col>
            ))}
            </Row>  }
            
        </>
    )
}

export default Homescreen
