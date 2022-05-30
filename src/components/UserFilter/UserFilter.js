import ListGroup from "react-bootstrap/ListGroup";
import "./UserFilter.css";

export const UserFilter = ({ userList, setSelectedUser }) => {
  return (
    <ListGroup as="ul">
      {userList.map((user, index) => {
        return (
          <ListGroup.Item
            key={index}
            action
            value={user}
            onClick={(e) => setSelectedUser(e.target.value)}
          >
            {user}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
