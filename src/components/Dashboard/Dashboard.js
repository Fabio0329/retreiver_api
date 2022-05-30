// Modules
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { Chart } from "../Chart/Chart";
import { UserFilter } from "../UserFilter/UserFilter";
import { OrdersTable } from "../OrdersTable/OrdersTable";
import "./Dashboard.css";

// Component that displays a dashboard for monitoring Retriever order status
export const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Fetches the current list of users and sets the initial selected user
  const getUsers = async () => {
    const fetched_users = await fetch("http://localhost:8000/api/userList");
    const users_json = await fetched_users.json();
    setUserList(users_json);
    setSelectedUser(users_json[0]);
  };

  // Calls getUsers on component mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Retriever Dashboard (Alpha)</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="container_main">
        <Row>
          <Col className="chartColumn">
            <Chart selectedUser={selectedUser} />
          </Col>
          <Col className="userListColumn">
            <UserFilter userList={userList} setSelectedUser={setSelectedUser} />
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <OrdersTable selectedUser={selectedUser} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
