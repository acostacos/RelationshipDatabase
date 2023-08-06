import React from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import './Link.css';

function Link({
  children,
  linkTo,
}) {
  return (
    <RLink to={linkTo} className="app-link">
      {children}
    </RLink>
  );
}

Link.propTypes = {
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
