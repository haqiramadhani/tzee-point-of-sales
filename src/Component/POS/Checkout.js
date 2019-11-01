import React from 'react';
import {Button} from 'semantic-ui-react';

const Checkout = (props) => {
    return (
        <div>
            <Button.Group size='massive' fluid>
                <Button onClick={()=>{props.handleCheckout()}} positive animated>
                    <Button.Content visible>{`Total Rp ${props.total}`}</Button.Content>
                    <Button.Content hidden>Checkout</Button.Content>
                </Button>
                <Button.Or />
                <Button onClick={()=>{props.setListCarts()}}>Cancel</Button>
            </Button.Group>
        </div>
    )
};

export default Checkout;