// Modules
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./OrdersTable.css";

/**
 * Component displays a table of order details
 * @param selectedUser - State passed down from the Dashboard component indicating the currently selected user
 */
export const OrdersTable = ({ selectedUser }) => {
  const [orders, setOrders] = useState([]);

  // Fetches orders based on the current selected user and stores the orders in state
  const getOrders = async () => {
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${selectedUser}`
    );
    const json_orders = await fetched_orders.json();
    setOrders(json_orders);
  };

  // Helper function that determines the current status of the order
  const getOrderStatus = (order) => {
    if (
      order.shipments[0].box_shipped_at &&
      !order.shipments[0].box_delivered_at
    ) {
      return "Box Shipped";
    } else if (
      order.shipments[0].box_delivered_at &&
      !order.shipments[0].device_shipped_at
    ) {
      return "Box Delivered";
    } else if (
      order.shipments[0].device_shipped_at &&
      !order.shipments[0].device_delivered_at
    ) {
      return "Device Shipped";
    } else if (order.shipments[0].device_delivered_at) {
      return "Device Delivered";
    }
  };

  // Updates the orders stored in state based on the currently selected user
  useEffect(() => {
    if (selectedUser) {
      getOrders();
    }
  }, [selectedUser]);

  return (
    <div className="table_wrapper">
      <Table striped bordered hover responsive className="orders_table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>email</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.employee_info.name}</td>
                <td>{order.employee_info.email}</td>
                <td>{`${order.employee_info.address_line_1} ${order.employee_info.address_line_2}, ${order.employee_info.address_city}, ${order.employee_info.address_state} ${order.employee_info.address_zip}`}</td>
                <th>{order.created_at.slice(0, 10)}</th>
                <td>{getOrderStatus(order)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
