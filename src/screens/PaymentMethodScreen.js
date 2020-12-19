import React,{useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer/FormContainer';
import { savePaymentMethod } from '../redux/Cart/cartActions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';

function PaymentMethodScreen({history}) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if(!shippingAddress){
        history.push(`/shipping`)
    }
    
    const [paymentMethod, setPaymentMethod] = useState(`PayPal`);
    

    const dispatch = useDispatch()

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push(`/placeorder`)
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandle}>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" value="PayPal" id="PayPal" name="paymentMethod" checked onChange={e=> setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type="radio" label="Stripe" value="Stripe" id="Stripe" name="paymentMethod" onChange={e=> setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form> 
        </FormContainer>
    )
}

export default PaymentMethodScreen
