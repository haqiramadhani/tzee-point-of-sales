import React, { useState } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { Modal, Button } from "semantic-ui-react";

const DeleteProduct = (props) => {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
         const url = process.env.REACT_APP_API_URL;
         const configs = {headers: {Authorization: localStorage.getItem('token')}};
         Axios.delete(url + '/product/' + props.id, configs)
         .then(r => {
             if (r.data.status === 200) {
                 swal({title: 'Success', text: r.data.message, icon: 'success', timer: 5000});
             } else {
                 swal({title: 'Warning', text: r.data.message, icon: 'warning', timer: 5000});
             }
         }).catch(e => swal({title: 'Error', text: e.data.message, icon: 'error', timer: 5000}));
         props.reload(1);
     }

    return (
        <div>
            <Button onClick={()=>{setOpen(true)}} icon='delete' negative/>
            <Modal size='mini' open={open} onClose={()=>{setOpen(false)}}>
                <Modal.Header>Delete This Product</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this product</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={()=>{setOpen(false)}} negative>No</Button>
                    <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={()=>{handleDelete()}}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
};

export default DeleteProduct;