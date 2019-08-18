import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import './index.scss';

class Expenses extends PureComponent {
  render() {
    if (this.props.expenses) {
      return (
        <Paper xs={12} className="expenses-container">
          <Table className="expenses-table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell className="description">Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.expenses.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {moment(row.date).format('MMM DD')}
                  </TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>${row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    return null;
  }
}

export default Expenses;
