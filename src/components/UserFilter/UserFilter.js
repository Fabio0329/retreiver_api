// Modules
import ListGroup from "react-bootstrap/ListGroup";
import "./UserFilter.css";

/**
 * Component displays a list of users and filters orders based on the selected user
 * @param userList - List of users passed down from Dashboard state 'userList'
 * @param setSelectedUser - Sets the Dashboard state 'selectedUser'
 */
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
