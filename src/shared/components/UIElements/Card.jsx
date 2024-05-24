import PropTypes from "prop-types";
import "./Card.css";

export default function Card({ className, style, children }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node,
};
