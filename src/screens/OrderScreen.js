import React, { useEffect} from 'react'
//import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector} from 'react-redux';
import { Col, ListGroup, Row, Image, } from 'react-bootstrap';
import Message from '../Message/Message';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../redux/Order/orderActions';
import Loader from '../components/Loader/Loader';
import instance from '../axios/axios';

function OrderScreen() {
    const {id} =useParams()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const addDecimals = num => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((total, item) =>(item.qty * item.price + total),0))
    
    useEffect(()=>{

        const addPayPalScript = async() => {
            const {data: clientId} = await instance.get(`api/config/paypal`)
            console.log(clientId)
        }
        addPayPalScript()

        dispatch(getOrderDetails(id))
    },[dispatch,id])

    
    

    return loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt}</Message>: <Message variant="danger">Not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message>: <Message variant="danger">Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (<Message>Order is Empty</Message>): (
                                <ListGroup variant="flush">
                                    {
                                        order.orderItems.map( (item, index) =>(
                                            <ListGroup.Item key={index} >
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} * ${item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
    </>
}

export default OrderScreen
