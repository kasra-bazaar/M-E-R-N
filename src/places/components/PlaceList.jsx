import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import PropTypes from "prop-types";
import "./PlaceList.css";
export default function PlaceList({ items, removePlace }) {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2> No Place Available . Maybe Create One?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }
  const onDeleteHandler = (placeId) => {
    removePlace(placeId);
  };
  return (
    <ul className="place-list">
      {items.map((place, i) => (
        <PlaceItem
          key={i}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatoorId={place.creator}
          coordinates={place.location}
          onDelete={onDeleteHandler}
        />
      ))}
    </ul>
  );
}

PlaceList.propTypes = {
  items: PropTypes.array,
  removePlace : PropTypes.any
};
