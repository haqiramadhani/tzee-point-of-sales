import React, { useState, useEffect } from 'react';
import { Icon, Menu, Segment, Table, Grid } from 'semantic-ui-react';
import alert from 'sweetalert';
import Axios from 'axios';
import Checkout from '../Component/POS/Checkout';
import ListCart from '../Component/POS/ListCart';
import ListProducts from '../Component/POS/ListProducts';
import PaginationUi from '../Component/Pagination';
import Settings from '../Component/POS/Settings';
import RightSearch from '../Component/POS/RightSearch';
import '../Styles.css'

const POS = () => {
    const [listProducts, setListProducts] = useState([]);
    const [listCarts, setListCarts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('ascending');
    const [keyword, setKeyword] = useState('');
    const [reload, setReload] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        let endpoint = '';
        if (keyword === '') endpoint = `/product?sort_by=${sort}&order=${order}&per_page=12&`;
        else endpoint = `/product/search?q=${keyword}&sort_by=${sort}&order=${order}&per_page=12&`
        Axios.get(process.env.REACT_APP_API_URL + endpoint, {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setListProducts(response.data.results.products);
                setTotalPage(response.data.results.info.total.page);
            }
        })
    },[keyword, sort, order]);

    useEffect(()=>{
        let sum = 0;
        listCarts.map(item=>{
            sum += item.subtotal();
        })
        console.log('total => ', sum)
        setTotal(sum)
    },[reload])

    const addCartItem = (product) => {
        let list = listCarts;
        const index = list.findIndex(e=> e.id === product.id);
        if (product.qty <= 0) {
            // alert.show(<div className='alert'>Product out of stock!</div>, {timeout: 5000, type: 'info'});
            alert({title: 'Warning!', text: 'Product out of stock!', icon: 'warning', timer: 5000})
        } else if (index !== -1) {
            if (list[index].qty < product.qty) list[index].qty += 1;
            // else alert.show(<div className='alert'>Only {item.qty} product left!</div>, {timeout: 5000, type: 'info'})
            else alert({title: 'Warning!', text: `Stock only ${product.qty} product left!`, icon: 'warning', timer: 5000})
        } else {
            const listItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                maxQty: product.qty,
                subtotal: function () {return this.price * this.qty}
            }
            // list.push(listItem);
            list.push(listItem);
        };
        setListCarts(list);
        setReload(reload + 1)
        // setTest(listCarts.length)
        console.log(listCarts, reload)
    }

    const handleChange = (event, id) => {
        let list = listCarts;
        const index = list.findIndex(e=> e.id === id);
        console.log(event.target.value, list[index])
        if (event.target.value <= list[index].maxQty) list[index].qty = event.target.value;
        else alert({title: 'Warning!', text: `Stock only ${list[index].maxQty} product left!`, icon: 'warning', timer: 5000})
        setReload(reload + 1)
    }

    const deleteCartItem = (id) => {
        // const index = listCarts.findIndex(item=> item.id === id);
        setListCarts([...listCarts.filter(item=>item.id!=id)]);
        setReload(reload + 1)
    }

    const handleCheckout = () => {
        console.log(listCarts.length)
        if (listCarts.length !== 0)
        {const detail = listCarts.map(item => {
            return {product_id: item.id, qty: Number(item.qty), subtotal: item.subtotal()}
        })
        // console.log('detail order ', detail)
        const data = {
            customer: 'Walk-in Customer',
            detail: JSON.stringify(detail),
            total: total
        }
        Axios.post(process.env.REACT_APP_API_URL + '/sale', data, {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.data.status === 200) {
                setListCarts([]);
                setReload(reload + 1);
                alert({title: 'Success', text: response.data.message, icon: 'success', timer: 5000})
            } else {
                alert({title: 'Failed', text: response.data.message, icon: 'error', timer: 5000})
            }
        })
        setReload(reload + 1);}
        else {
            alert({title: 'Warning', text: 'Cart is Empty, select some product before checkout', icon: 'warning', timer: 5000})
        }
    }

    return (
        <div className='POS-root'>
            <Grid>
                {/* ==================== Left Side | List Product ===================== */}
                <Grid.Column width={10}>
                    <Menu attached='top'>
                        <Settings setSort={(val) => {setSort(val)}} setOrder={(val) => {setOrder(val)}}/>
                        <RightSearch keyword={(key) => setKeyword(key)}/>
                    </Menu>

                    <Segment attached='bottom' className='scroll'>
                        <ListProducts add={(product)=>{addCartItem(product)}} list={listProducts}/>
                    </Segment>
                    <PaginationUi page={page} setPage={(active)=>{setPage(active)}} total={totalPage} />
                </Grid.Column>
                {/* ==================== Right Side | Cart ==================== */}
                <Grid.Column width={6}>
                    <Table>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.Cell><h2><Icon name='cart'/>CART</h2></Table.Cell>
                            </Table.Row>
                        </Table.Header>
                    </Table>
                    <ListCart cart={listCarts} change={(event, id)=>{handleChange(event, id)}} delete={(id)=>{deleteCartItem(id)}} />
                    <Checkout handleCheckout={()=>{handleCheckout()}} total={total} setListCarts={()=>{setListCarts([])}}/>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default POS;
