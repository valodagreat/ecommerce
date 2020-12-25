import React, { useEffect, useState} from 'react'
import { PayPalButton } from "react-paypal-button-v2";
//import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector} from 'react-redux';
import { Col, ListGroup, Row, Image, Button, } from 'react-bootstrap';
import Message from '../Message/Message';
import { Link, useParams } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from '../redux/Order/orderActions';
import Loader from '../components/Loader/Loader';
import instance from '../axios/axios';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../redux/Order/orderTypes';

function OrderScreen({history}) {
    const [sdkReady, setSdkReady] = useState(false)
    const {id} =useParams()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver} = orderDeliver

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay} = orderPay

    const addDecimals = num => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    if(!loading){
        order.itemsPrice = addDecimals(order.orderItems.reduce((total, item) =>(item.qty * item.price + total),0))
    }
    if(!userInfo){
        history.push('/login')
    }
    
    useEffect(()=>{
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await instance.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver || order._id !== id){
            dispatch({type: ORDER_PAY_RESET })
            dispatch({type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
        }else{
            setSdkReady(true)
        }

    },[dispatch,id,successPay,order,userInfo,history,successDeliver])

    const successPaymentHandler = (paymentResult) => {
        
        dispatch(payOrder(id, paymentResult))
    }
    const deliverHandle = () =>{
        dispatch(deliverOrder(order._id))
    }

    return loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> : <>
        <p className="order_id">Order <span>{order._id}</span></p>
        
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
                        {
                            !order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )
                        }
                        {loadingDeliver && <Loader />}
                        {
                            userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={deliverHandle} > 
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
    </>
}

export default OrderScreen
