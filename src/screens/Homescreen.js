import React,{useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Meta from '../components/Meta/Meta';
import Paginate from '../components/Paginate/Paginate';
import Product from '../components/Product/Product';
import ProductsCarousel from '../components/ProductsCarousel/ProductsCarousel';
import Message from '../Message/Message';
import { listProducts } from '../redux/Product/productActions';

function Homescreen() {

    const dispatch = useDispatch();
    const {keyword} = useParams();
    const {pageNumber} = useParams();
    //const pageNum = pageNumber || 1
    const productList = useSelector(state => state.productList)
    const {products,loading,error,page,pages} = productList

    useEffect(() => {
        
        dispatch(listProducts(keyword, pageNumber || 1));
    }, [dispatch,keyword,pageNumber])
    
    return (
        <>
            <Meta />
            {!keyword ? <ProductsCarousel /> : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                <Row>
                {products?.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
            </>}
            
        </>
    )
}

export default Homescreen
