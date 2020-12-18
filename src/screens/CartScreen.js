import React,{ useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/Cart/cartActions';
import { Col, ListGroup, Row, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../Message/Message';

function CartScreen({history,location}) {
    const {id} = useParams();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    useEffect(() => {

        if(id){
            dispatch(addToCart(id,qty))
        }
        
    },[dispatch,id,qty])


    const removeFromCartHandle = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandle = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message> :
                    <ListGroup variant="flush">
                        {
                            cartItems.map(item =>(
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x =>(
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant="light" onClick={()=> removeFromCartHandle(item.product)}><i className="fas fa-trash"></i></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup> 
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((total, item) =>(item.qty + total),0)}) items</h2>
                            ${cartItems.reduce((total, item) =>(item.qty* item.price + total),0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandle} >
                            Proceed To Checkout
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
