import React, { useState } from 'react';
import { Modal, Form, Button, Input, Icon } from "semantic-ui-react";
import Axios from 'axios';
import alert from 'sweetalert';

const AddProduct = (props) => {
    const [open, setOpen] = useState(false);
    
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [image, setImage] = useState('');
    const [cost, setCost] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        const data = {name, code, description, category_id, image, cost, price};
        const url = process.env.REACT_APP_API_URL;
        const configs = {headers: {Authorization: localStorage.getItem('token')}};
        Axios.post(url + '/product', data, configs)
        .then(response=>{
            if (response.data.status === 200) {
                alert({title: 'Success', text: response.data.message, icon: 'success', timer: 5000})
            }
            else alert({title: 'Failed', text: response.data.message, icon: 'error', timer: 5000})
        })
        setOpen(false);
        props.reload(1);
    }
    
    return (
        <div>
            <div className='addbutton'>
                <Button onClick={()=>{setOpen(true)}} primary>Add Product</Button>
            </div>
            <Modal open={open} size='tiny'>
                <Modal.Header>Add New Product</Modal.Header>
                <Modal.Content>
                    <Form id='add-product' onSubmit={(event)=>{handleSubmit(event)}}>
                        <Form.Input onChange={(event)=>{setCode(event.target.value)}} value={code} name='code' placeholder='Code / SKU'/>
                        <Form.Input onChange={(event)=>{setName(event.target.value)}} value={name} name='name' placeholder='Product Name'/>
                        <Form.TextArea onChange={(event)=>{setDescription(event.target.value)}} value={description} name='description' placeholder='Description'/>
                        <Form.Select onChange={(e, {value})=>{setCategory_id(value)}} value={category_id} placeholder='Select Category' name='category' options={props.categories}/>
                        <Form.Field><Input onChange={(event)=>{setImage(event.target.value)}} value={image} name='image' placeholder='Image URL'/></Form.Field>
                        <Form.Field><Input onChange={(event)=>{setCost(event.target.value)}} value={cost} label='Rp' name='cost' placeholder='Cost' fluid/></Form.Field>
                        <Form.Field><Input onChange={(event)=>{setPrice(event.target.value)}} value={price} label='Rp' name='price' placeholder='Price' fluid/></Form.Field>
                    </Form>
                        
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
                    <Button type='submit' form='add-product' primary><Icon name='save' /> Save</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
};

export default AddProduct;