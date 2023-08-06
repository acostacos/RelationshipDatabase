import React from 'react';
import PropTypes from 'prop-types';

function ErrorPage({
  errorMessage,
}) {
  return (
    <div id="error-page">
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorPage;
