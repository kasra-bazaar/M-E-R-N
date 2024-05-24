import { useContext } from "react";
import { AuthContext } from "../store/Context";

export default function useAuth() {
  const { isLogedIn, login, logout, userId , token} = useContext(AuthContext);

  return { isLogedIn, login, logout, userId , token };
}
