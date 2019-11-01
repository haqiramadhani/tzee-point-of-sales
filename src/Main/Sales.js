import React, { useState, useEffect } from 'react';
import { Button, Table, Image } from 'semantic-ui-react';
import '../Styles.css'
import Axios from 'axios';
import PaginationUi from '../Component/Pagination';

const Sales = () => {
    const [listSales, setListSales] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [reload, setReload] = useState(1);

    useEffect(()=>{
        // console.log('halo');
        Axios.get(process.env.REACT_APP_API_URL + '/sale', {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setListSales(response.data.results)
            }
        })
    },[reload]);

    return (
        <div className='Products-root'>
            {/* =================================================================== */}
            <Table celled padded sortable selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Invoice</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    {/* <Table.HeaderCell>Detail</Table.HeaderCell> */}
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listSales.map(item=>(
                    <Table.Row key={item.id}>
                        <Table.Cell>
                        {item.invoice}
                        </Table.Cell>
                        <Table.Cell singleLine>{item.customer}</Table.Cell>
                        <Table.Cell>Rp {item.total}</Table.Cell>
                        {/* <Table.Cell> */}
                            {/* <Button.Group vertical icon> */}
                                {/* <EditProduct product={product} categories={categories}  reload={(i) => {setReload(reload + i)}}/> */}
                                {/* <DeleteProduct id={product.id} reload={(i) => {setReload(reload + i)}}/> */}
                                {/* <Button onClick={()=>{handleDelete(product.id)}} icon='delete' negative/> */}
                            {/* </Button.Group> */}
                        {/* </Table.Cell> */}
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <PaginationUi page={page} setPage={(active)=>{setPage(active)}} total={totalPage} />
        </div>
    )
}

export default Sales;