import React,{ useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SearchBox() {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const submitHandle = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandle} inline>
                <Form.Control type="text" placeholder="Search Products" name="q" onChange={(e) => setKeyword(e.target.value)} className="mr-sm-2 ml-sm-5" >

                </Form.Control>
                <Button type="submit" className="outline-success" >Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox
