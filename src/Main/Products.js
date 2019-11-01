import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Icon, Input, Dropdown, Table, Header, Rating, Image } from 'semantic-ui-react';
import '../Styles.css'
import Axios from 'axios';
import AddProduct from '../Component/Products/AddProduct';
import EditProduct from '../Component/Products/EditProduct';
import DeleteProduct from '../Component/Products/DeleteProduct';
import PaginationUi from '../Component/Pagination';

const Products = () => {
    const [listProducts, setListProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('ascending');
    const [keyword, setKeyword] = useState('');
    const [reload, setReload] = useState(1);
    const [mode, setMode] = useState('add');
    const [confirm, setConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        // console.log('page => ', page)
        let endpoint = '';
        if (keyword === '') endpoint = `/product?sort_by=${sort}&order=${order}&per_page=12&page=${page}`;
        else endpoint = `/product/search?q=${keyword}&sort_by=${sort}&order=${order}&per_page=12&page=${page}`
        Axios.get(process.env.REACT_APP_API_URL + endpoint, {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setListProducts(response.data.results.products);
                setTotalPage(response.data.results.info.total.page);
            }
        })
    },[keyword, sort, order, reload, page]);

    useEffect(()=>{
        // console.log('halo');
        Axios.get(process.env.REACT_APP_API_URL + '/category', {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setCategories(response.data.results.map(item=>{
                    return {key: item.id, text: item.name, value: item.id}
                }))
            }
        })
    },[]);

    const handleDelete = (id) => {
        setConfirm(true);
    }

    console.log(categories);

    return (
        <div className='Products-root'>
            <AddProduct reload={(i) => {setReload(reload + i)}} categories={categories} />
            {/* =================================================================== */}
            <Table celled padded sortable selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Image</Table.HeaderCell>
                    <Table.HeaderCell onClick={()=>{setSort('name')}}>Name</Table.HeaderCell>
                    <Table.HeaderCell>Qty</Table.HeaderCell>
                    <Table.HeaderCell onClick={()=>{setSort('category')}}>Category</Table.HeaderCell>
                    <Table.HeaderCell>Cost & Price</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listProducts.map(product=>(
                    <Table.Row key={product.id}>
                        <Table.Cell>
                        <Image src={product.image} size='tiny'/>
                        </Table.Cell>
                        <Table.Cell singleLine>{product.name}<br/> Code: {product.code}</Table.Cell>
                        <Table.Cell>{product.qty}</Table.Cell>
                        <Table.Cell singleLine>{product.category}</Table.Cell>
                        <Table.Cell singleLine>Rp {product.cost}<br/>Rp {product.price}</Table.Cell>
                        <Table.Cell>{product.description}</Table.Cell>
                        <Table.Cell>
                            <Button.Group vertical icon>
                                <EditProduct product={product} categories={categories}  reload={(i) => {setReload(reload + i)}}/>
                                <DeleteProduct id={product.id} reload={(i) => {setReload(reload + i)}}/>
                                {/* <Button onClick={()=>{handleDelete(product.id)}} icon='delete' negative/> */}
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <PaginationUi page={page} setPage={(active)=>{setPage(active)}} total={totalPage} />
        </div>
    )
}

export default Products;