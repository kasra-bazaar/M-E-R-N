import PropTypes from "prop-types";
import "./Avatar.css";

export default function Avatar({ image, style, width, alt, className }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  style: PropTypes.string,
  width: PropTypes.any,
  className: PropTypes.string,
  alt: PropTypes.string,
};
