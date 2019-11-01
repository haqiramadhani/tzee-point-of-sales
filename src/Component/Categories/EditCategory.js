import React, { useState } from 'react';
import { Modal, Form, Button, Input, Icon } from "semantic-ui-react";
import Axios from 'axios';
import alert from 'sweetalert';

const EditCategory = (props) => {
    const [open, setOpen] = useState(false);
    
    const [name, setName] = useState(props.category.name);
    const [description, setDescription] = useState(props.category.description);
    const [image, setImage] = useState(props.category.image);

    const handleSubmit = (event) => {
        const data = {name, description, image};
        const url = process.env.REACT_APP_API_URL;
        const configs = {headers: {Authorization: localStorage.getItem('token')}};
        Axios.put(url + '/category/' + props.category.id, data, configs)
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
                <Button onClick={()=>{setOpen(true)}} icon='edit' positive/>
            </div>
            <Modal open={open} size='tiny'>
                <Modal.Header>Edit Category</Modal.Header>
                <Modal.Content>
                    <Form id='add-product' onSubmit={(event)=>{handleSubmit(event)}}>
                        <Form.Input onChange={(event)=>{setName(event.target.value)}} value={name} name='name' placeholder='Product Name'/>
                        <Form.TextArea onChange={(event)=>{setDescription(event.target.value)}} value={description} name='description' placeholder='Description'/>
                        <Form.Field><Input onChange={(event)=>{setImage(event.target.value)}} value={image} name='image' placeholder='Image URL'/></Form.Field>
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

export default EditCategory;