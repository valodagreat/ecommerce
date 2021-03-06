import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer/FormContainer';
import { saveShippingAddress } from '../redux/Cart/cartActions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';

function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState("");

    const dispatch = useDispatch()

    useEffect(()=>{
        if(shippingAddress.address){
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }
    },[shippingAddress])
    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        history.push(`/payment`)
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandle}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" required value={address} onChange={e=> setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" required value={city} onChange={e=> setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter postal code" required value={postalCode} onChange={e=> setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" required value={country} onChange={e=> setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form> 
        </FormContainer>
    )
}

export default ShippingScreen
