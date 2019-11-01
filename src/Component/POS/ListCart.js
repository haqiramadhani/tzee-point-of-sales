import React from 'react';
import { Grid, Table, Header, Image, Icon } from "semantic-ui-react";
import '../styles.css';

const ListCart = (props) => {
    return (
        <div>
            <Grid celled className='listcart'>
                <Table>
                    <Table.Body>
                        {props.cart.map(item => (
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={item.image} rounded size='mini' />
                                    <Header.Content>
                                    {item.name}
                                    <Header.Subheader>Rp {item.price}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <input type='number' min='1' onChange={(event)=>{props.change(event, item.id)}} max={item.stock} value={item.qty} className='POS-qty'/>
                            </Table.Cell>
                            <Table.Cell>Rp {item.price * item.qty   }</Table.Cell>
                            <Table.Cell><Icon onClick={()=>{props.delete(item.id)}} className='link icon' name="window close" size='large'/></Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Grid>
        </div>
    )
}

export default ListCart;