import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttp from "../../hooks/useHttp";

export default function Users() {
  const { isLoading, clearError, error, sendRequest } = useHttp();
  const [loadedUsers, setLoadedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const reuestedData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API}/users`
        );

        setLoadedUsers(reuestedData.users);
      } catch (err) {
        ("");
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
}
