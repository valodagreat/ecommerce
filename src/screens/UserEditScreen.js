import React,{useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer/FormContainer'
import Loader from '../components/Loader/Loader'
import Message from '../Message/Message'
import { USER_UPDATE_RESET } from '../redux/User/userActions';
import { getUserDetails, updateUser } from '../redux/User/userTypes'

function UserEditScreen({history}) {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            if(successUpdate){
                dispatch({
                    type: USER_UPDATE_RESET
                })
                history.push('/admin/userlist')
            }else{
                if(!user.name || user._id !== id){
                    dispatch(getUserDetails(id))
                }else{
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
            }
        }else{
            history.push(`/login`)
        }
        
    },[user,id,dispatch,successUpdate,history,userInfo]);
    
    const submitHandle = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, email, name, isAdmin }))
    }
    return (
        <>
            <Link to={`/admin/userlist`} className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandle}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=> setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isadmin">
                            <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={e=> setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
