import React, { useState, useEffect } from 'react';
import { Button, Table, Image } from 'semantic-ui-react';
import '../Styles.css'
import Axios from 'axios';
import AddPurchase from '../Component/Purchases/AddPurchase';
// import EditProduct from '../Component/Products/EditProduct';
// import DeleteProduct from '../Component/Products/DeleteProduct';
import PaginationUi from '../Component/Pagination';

const Purchases = () => {
    const [listPurchases, setListPurchases] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    // const [sort, setSort] = useState('id');
    // const [order, setOrder] = useState('ascending');
    // const [keyword, setKeyword] = useState('');
    const [reload, setReload] = useState(1);
    // const [mode, setMode] = useState('add');
    // const [confirm, setConfirm] = useState(false);
    // const [isDelete, setIsDelete] = useState(false);

    // const [categories, setCategories] = useState([])

    // useEffect(()=>{
    //     let endpoint = '';
    //     if (keyword === '') endpoint = `/product?sort_by=${sort}&order=${order}&per_page=12&`;
    //     else endpoint = `/product/search?q=${keyword}&sort_by=${sort}&order=${order}&per_page=12&`
    //     Axios.get(process.env.REACT_APP_API_URL + endpoint, {headers: {Authorization: localStorage.getItem('token')}})
    //     .then(response => {
    //         if (response.data.status === 200) {
    //             setListProducts(response.data.results.products);
    //             setTotalPage(response.data.results.info.total.page);
    //         }
    //     })
    // },[keyword, sort, order, ]);

    useEffect(()=>{
        // console.log('halo');
        Axios.get(process.env.REACT_APP_API_URL + '/purchase', {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setListPurchases(response.data.results)
            }
        })
    },[reload]);

    return (
        <div className='Products-root'>
            <AddPurchase reload={(i) => {setReload(reload + i)}} purchases={listPurchases} />
            {/* =================================================================== */}
            <Table celled padded sortable selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Invoice</Table.HeaderCell>
                    <Table.HeaderCell>Suplier</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell>Paid</Table.HeaderCell>
                    <Table.HeaderCell>Due</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listPurchases.map(item=>(
                    <Table.Row key={item.id}>
                        <Table.Cell>
                        <Image src={item.invoice} size='tiny'/>
                        </Table.Cell>
                        <Table.Cell singleLine>{item.suplier}</Table.Cell>
                        <Table.Cell>Rp {item.total}</Table.Cell>
                        <Table.Cell singleLine>Rp {item.paid}</Table.Cell>
                        <Table.Cell singleLine>Rp {item.due}</Table.Cell>
                        <Table.Cell>{item.status}</Table.Cell>
                        <Table.Cell>
                            <Button.Group vertical icon>
                                {/* <EditProduct product={product} categories={categories}  reload={(i) => {setReload(reload + i)}}/> */}
                                {/* <DeleteProduct id={product.id} reload={(i) => {setReload(reload + i)}}/> */}
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

export default Purchases;