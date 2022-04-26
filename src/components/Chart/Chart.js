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

  const getOrders = async () => {
    const fetched_users = await fetch("http://localhost:8000/api/");
    const json_users = await fetched_users.json();
    setUserList(json_users.users);
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${json_users.users[0]}`
    );
    const json_orders = await fetched_orders.json();
    setOrders(json_orders);
  };

  const updateOrders = async () => {
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${selectedUser}`
    );
    const json_orders = await fetched_orders.json();
    setOrders(json_orders);
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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Pie
            data={data}
            width={"100%"}
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
