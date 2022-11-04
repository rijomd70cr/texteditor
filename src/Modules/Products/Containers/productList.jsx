import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listproductAsych } from '../Reducer/index';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Productlist() {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.products);
    useEffect(() => { dispatch(listproductAsych()) }, []);



    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell >Brand</TableCell>
                            <TableCell >category</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.productArray && product.productArray.length > 0 &&
                            product.productArray.map(
                                (item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {item.title}
                                            </TableCell>
                                            <TableCell >{item.brand}</TableCell>
                                            <TableCell >{item.category}</TableCell>
                                            <TableCell >{item.price}</TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
