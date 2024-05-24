import PropTypes from 'prop-types';
import  { createPortal } from 'react-dom';

import './Backdrop.css';

export default function Backdrop ({ onClick}) {
  return createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById('aside')
  );
}

Backdrop.propTypes ={ 
  onClick : PropTypes.any
}


