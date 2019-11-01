import React from 'react';
import { Menu, Button } from "semantic-ui-react";

const RightSearch = (props) => {
    return (
        <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
                <form onSubmit={(event)=>{event.preventDefault(); props.keyword(event.target.keyword.value)}}>
                    <div className='ui transparent icon input'>
                        <input name='keyword' className='prompt' type='text' placeholder='Search product...'/>
                        <Button type='submit' icon='search'/>
                    </div>
                </form>
                <div className='results' />
            </div>
        </Menu.Menu>
    )
};

export default RightSearch;