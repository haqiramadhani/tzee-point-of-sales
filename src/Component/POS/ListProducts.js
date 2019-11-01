import React from 'react';
import { Grid, Card } from "semantic-ui-react";

const ListProducts = (props) => {
    return (
        <Grid relaxed='very' columns={4} doubling>
            {props.list.map(product => (
            <Grid.Column className='link' key={product.id} onClick={()=>{props.add(product)}}>
                <Card color='violet' image={product.image}/>
                <Card.Header>{product.name}</Card.Header>
            </Grid.Column>
            ))}
        </Grid>
    )
};

export default ListProducts;