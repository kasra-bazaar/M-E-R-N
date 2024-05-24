import PropTypes from "prop-types";

import "./SideDrawer.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function SideDrawer({ children, OnClick, show }) {
  let content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={OnClick}>
        {children}
      </aside>
    </CSSTransition>
  );
  return createPortal(content, document.getElementById("aside"));
}
SideDrawer.propTypes = {
  children: PropTypes.node,
  OnClick: PropTypes.any,
  show: PropTypes.bool,
};
