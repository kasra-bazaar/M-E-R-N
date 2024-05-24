import Card from "../../shared/components/UIElements/Card";
import PropTypes from "prop-types";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import useAuth from "../../hooks/useAuth";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
export default function PlaceItem({
  image,
  title,
  description,
  creatoorId,
  address,
  id,
  onDelete,
}) {
  const { userId, token } = useAuth();
  const [ShowMap, setShowMap] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const cancleDeleteHandler = () => setDeleteItem(false);
  const openDeleteModal = () => setDeleteItem(true);
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const deleteItemHandler = async () => {
    try {
      setDeleteItem(false);
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_API}/places/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer" + token,
        }
      );
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={ShowMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>The Map !</h2>
        </div>
      </Modal>
      <Modal
        show={deleteItem}
        header="Are you Sure ? "
        footer={
          <>
            <Button inverse onClick={cancleDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteItemHandler}>
              Confirm
            </Button>
          </>
        }
        footerClass="place-item__modal-actions"
      >
        <p> Are you sure? you can not undone therefore ! </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${import.meta.env.VITE_ASSET_URL}/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {userId === creatoorId && (
              <Button to={`/places/${id}`}>EDIT</Button>
            )}
            {userId === creatoorId && (
              <Button danger onClick={openDeleteModal}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
PlaceItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  id: PropTypes.string,
  onDelete: PropTypes.any,
  creatoorId: PropTypes.string,
};
