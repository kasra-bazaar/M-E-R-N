import UsersItem from "./UsersItem";
import PropTypes from "prop-types";
import './UsersList.css'
export default function UsersList({ items }) {
  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found .</h2>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {items.map((user, i) => (
        <UsersItem
          key={i}
          image={user.image}
          placeCount={user.places.length}
          id={user.id}
          name={user.name}
        />
      ))}
    </ul>
  );
}

UsersList.propTypes = {
  items: PropTypes.array,
};
