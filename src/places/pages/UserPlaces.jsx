import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

export default function UserPlaces() {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const [userPlaces, setUserPlaces] = useState();
  const { token } = useAuth();
  const userId = useParams().userId;
  useEffect(() => {
    const placesData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API}/places/user/${userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer" + token,
          }
        );
        setUserPlaces(responseData.userPlaces);
      } catch (err) {
        ("");
      }
    };
    placesData();
  }, [sendRequest, userId , token]);
  const removePlaceHandler = (id) => {
    setUserPlaces((prevPlace) => prevPlace.filter((place) => place.id !== id));
  };
  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && userPlaces && (
        <PlaceList items={userPlaces} removePlace={removePlaceHandler} />
      )}
    </>
  );
}
