import { Link } from "react-router-dom";

import "./Button.css";
import PropTypes from 'prop-types'
export default function Button({
  size,
  danger,
  inverse,
  to,
  children,
  type,
  onClick,
  disabled,
  exact,
  href,
}) {
  if (href) {
    return (
      <a
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        
        exact={exact}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
   size : PropTypes.number
   , danger : PropTypes.bool ,
   inverse : PropTypes.bool ,
   to : PropTypes.string ,
   children : PropTypes.node ,
   type : PropTypes.any , 
   onClick :   PropTypes.any , 
   disabled :   PropTypes.bool , 
   exact :   PropTypes.bool , 
   href : PropTypes.string ,
}