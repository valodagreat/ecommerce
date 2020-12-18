import React,{useState, useEffect} from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux';
//import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader'
import Message from '../Message/Message'
import { getUserDetails, updateUserProfile } from '../redux/User/userTypes'

function ProfileScreen({history, location}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success, userLoading} = userUpdateProfile

    

    useEffect(()=>{
        if(!userInfo){
            history.push(`/login`)
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, user, dispatch]);
    
    const submitHandle = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({_id: user._id, name, email, password}))
        }
        
    }
    return (
        <Row>
            <Col md={3}>
                <h1>Register</h1>
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Updated successfully</Message>}
                {loading && <Loader />}
                {userLoading && <Loader />}
                <Form onSubmit={submitHandle}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
