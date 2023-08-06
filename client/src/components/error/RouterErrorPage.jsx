import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function RouterErrorPage() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <ErrorPage errorMessage={error.statusText || error.message} />
  );
}

export default RouterErrorPage;
