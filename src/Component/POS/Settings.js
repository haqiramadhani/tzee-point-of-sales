import React from 'react';
import { Dropdown, Icon } from "semantic-ui-react";

const Settings = (props) => {
    return (
        <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <Icon name='dropdown' />
                    <span className='text'>Sort by</span>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{props.setSort('id')}}>Default</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{props.setSort('name')}}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{props.setSort('category')}}>Category</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{props.setSort('updated')}}>Date</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Icon name='dropdown' />
                    <span className='text'>Order</span>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{props.setOrder('ascending')}}>Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{props.setOrder('descending')}}>Descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default Settings;