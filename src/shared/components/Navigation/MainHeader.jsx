import PropTypes from "prop-types";
import "./MainHeader.css";
export default function MainHeader({ children }) {
  return <header className="main-header">{children}</header>;
}

MainHeader.propTypes = {
  children: PropTypes.node,
};
