import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Input, Icon } from "semantic-ui-react";
import Axios from 'axios';
import alert from 'sweetalert';

const AddPurchase = (props) => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    
    const [invoice, setInvoice] = useState('');
    const [suplier, setSuplier] = useState('');
    const [detail, setDetail] = useState([]);
    const [total, setTotal] = useState(0);
    const [paid, setPaid] = useState('');

    const [qty, setQty] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [product_id, setProduct_id] = useState({});

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL;
        const configs = {headers: {Authorization: localStorage.getItem('token')}};
        Axios.get(url + '/product', configs)
        .then(response=>{
            if (response.data.status === 200) {
                setProducts(response.data.results.products.map(item => {
                    return {key: item.id, text: item.name, value: item.id}
                }));
            }
        })
    }, [])

    const handleSubmit = (event) => {
        const due = total - paid;
        const status = (due > 0) ? 0 : 1;
        const data = {invoice, suplier, detail, total, paid, due, status};
        const url = process.env.REACT_APP_API_URL;
        const configs = {headers: {Authorization: localStorage.getItem('token')}};
        Axios.post(url + '/purchase', data, configs)
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
                <Button onClick={()=>{setOpen(true)}} primary>Make Purchase</Button>
            </div>
            <Modal open={open} size='big'>
                <Modal.Header>Add New Purchase</Modal.Header>
                <Modal.Content scrolling>
                    <Form id='add-product' onSubmit={(event)=>{handleSubmit(event)}}>
                        <Form.Input onChange={(event)=>{setInvoice(event.target.value)}} value={invoice} name='invoice' placeholder='Invoice'/>
                        <Form.Input onChange={(event)=>{setSuplier(event.target.value)}} value={suplier} name='suplier' placeholder='Suplier'/>
                        <Form.Input onChange={(event)=>{setPaid(event.target.value)}} value={paid} name='paid' placeholder='Down Payment'/>
                        
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

export default AddPurchase;