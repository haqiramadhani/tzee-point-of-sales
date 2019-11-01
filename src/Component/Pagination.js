import React from 'react';
import { Pagination, Icon } from "semantic-ui-react";

const PaginationUi = (props) => {
    return (
        <Pagination
            defaultActivePage={props.page}
            onPageChange={(e, {activePage})=>{props.setPage(activePage)}}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={props.total}
        />
    )
};

export default PaginationUi;