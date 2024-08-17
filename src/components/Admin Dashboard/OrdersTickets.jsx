import React from 'react';
import { Table } from 'react-bootstrap';
//import './OrdersTickets.css'; // Import the CSS file

const OrdersTickets = () => {
  return (
    <div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>Buyer1</td>
            <td>Artwork 1</td>
            <td>$100</td>
            <td>Completed</td>
            <td>2024-08-15</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersTickets;
