import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import './Loader.css';

function Loader({ isLoading }) {
  return (
    <div id="Loader">
      {isLoading && (
        <div className="loader-container">
          <div className="spinner-container">
            <Spinner animation="border" variant="light" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )}
    </div>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;
