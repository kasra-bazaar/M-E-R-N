import PropTypes from "prop-types";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import "./UsersItem.css";
export default function UsersItem({ image, name, id, placeCount }) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${import.meta.env.VITE_ASSET_URL}/${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}
UsersItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeCount: PropTypes.number,
};
