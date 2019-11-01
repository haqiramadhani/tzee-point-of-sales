import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Icon, Input, Dropdown, Table, Header, Rating, Image } from 'semantic-ui-react';
import alert from 'sweetalert';
import '../Styles.css'
import Axios from 'axios';
import AddCategory from '../Component/Categories/AddCategory';
import EditCategory from '../Component/Categories/EditCategory';
import DeleteCategory from '../Component/Categories/DeleteCategory';

const Categories = () => {
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
        // console.log('halo');
        Axios.get(process.env.REACT_APP_API_URL + '/category', {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setCategories(response.data.results)
            }
        })
    },[keyword, sort, order, reload]);

    const handleDelete = (id) => {
        setConfirm(true);
    }

    console.log(categories);

    return (
        <div className='Products-root'>
            <AddCategory reload={(i) => {setReload(reload + i)}} categories={categories} />
            {/* =================================================================== */}
            <Table celled padded sortable selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Image</Table.HeaderCell>
                    <Table.HeaderCell onClick={()=>{setSort('name')}}>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {categories.map(item=>(
                    <Table.Row key={item.id}>
                        <Table.Cell>
                        <Image src={item.image} size='tiny'/>
                        </Table.Cell>
                        <Table.Cell singleLine>{item.name}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>
                            <Button.Group vertical icon>
                                <EditCategory category={item} categories={categories}  reload={(i) => {setReload(reload + i)}}/>
                                <DeleteCategory id={item.id} reload={(i) => {setReload(reload + i)}}/>
                                {/* <Button onClick={()=>{handleDelete(product.id)}} icon='delete' negative/> */}
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default Categories;