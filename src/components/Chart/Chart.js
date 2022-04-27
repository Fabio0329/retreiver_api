import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([0, 0, 0, 0]);

  const getOrderStatus = (shipmentsArray) => {
    const orderStatusArr = [0, 0, 0, 0];
    shipmentsArray.forEach(({ shipments }) => {
      shipments.forEach((shipment) => {
        if (shipment.box_shipped_at && !shipment.box_delivered_at) {
          orderStatusArr[0] += 1;
        } else if (shipment.box_delivered_at && !shipment.device_shipped_at) {
          orderStatusArr[1] += 1;
        } else if (
          shipment.device_shipped_at &&
          !shipment.device_delivered_at
        ) {
          orderStatusArr[2] += 1;
        } else if (shipment.device_delivered_at) {
          orderStatusArr[3] += 1;
        }
      });
    });
    setOrderStatus(orderStatusArr);
  };

  const getOrders = async () => {
    const fetched_users = await fetch("http://localhost:8000/api/");
    const json_users = await fetched_users.json();
    setUserList(json_users.users);
    setSelectedUser(json_users.users[0]);
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${json_users.users[0]}`
    );
    const json_orders = await fetched_orders.json();
    setOrders(json_orders);
    getOrderStatus(json_orders);
  };

  const updateOrders = async () => {
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${selectedUser}`
    );
    const json_orders = await fetched_orders.json();
    setOrders(json_orders);
    getOrderStatus(json_orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      updateOrders();
    } else {
    }
  }, [selectedUser]);

  const data = {
    labels: [
      "Box Shipped",
      "Box Delivered",
      "Device Shipped",
      "Device Delievered",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: orderStatus,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // getOrderStatus(orders);

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Pie
            data={data}
            width={"30%"}
            options={{ maintainAspectRatio: false }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {userList.map((user) => (
              <option value={user} key={userList.indexOf(user)}>
                {user}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </Container>
  );
};
