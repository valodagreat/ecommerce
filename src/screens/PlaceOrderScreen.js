import React, { useEffect} from 'react'
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector} from 'react-redux';
import { Col, ListGroup, Row, Image, Button } from 'react-bootstrap';
import Message from '../Message/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/Order/orderActions';
import { USER_DETAILS_RESET } from '../redux/User/userActions';
import { ORDER_CREATE_RESET } from '../redux/Order/orderTypes';

function PlaceOrderScreen({history}) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const addDecimals = num => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
    },[history,order,success,dispatch])

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((total, item) =>(item.qty * item.price + total),0))
    cart.shippingPrice = addDecimals(cart.cartItemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    const placeOrderhandle = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (<Message>Your Cart is Empty</Message>): (
                                <ListGroup variant="flush">
                                    {
                                        cart.cartItems?.map( (item, index) =>(
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
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block" type="button" onClick={placeOrderhandle} disabled={cart.cartItems === 0} >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
