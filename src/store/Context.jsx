import { createContext } from "react";
import PropTypes from "prop-types";
import useAuthLogic from "../hooks/useAuthLogic";
export const AuthContext = createContext({
  isLogedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const { userId, logOutHandler, loginHandler, token } = useAuthLogic();

  const VALUE = {
    userId: userId,
    isLogedIn: !!token,
    token: token,
    login: loginHandler,
    logout: logOutHandler,
  };

  return <AuthContext.Provider value={VALUE}>{children} </AuthContext.Provider>;
};
export default AuthContextProvider;
AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
