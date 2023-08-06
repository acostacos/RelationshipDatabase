import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getFriends } from '../friendRequests';
import Loader from '../../shared/loader/Loader';
import ErrorPage from '../../error/ErrorPage';

function FriendsDetailsPage() {
  const { friendId } = useParams();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['friends', friendId],
    queryFn: () => getFriends(friendId),
  });

  return (
    <div id="FriendsDetailsPage">
      <Loader isLoading={isLoading} />
      {isError && (
        <ErrorPage errorMessage={JSON.stringify(error)} />
      )}
      {isSuccess && (
        <Container>
          <Outlet />
        </Container>
      )}
    </div>
  );
}

export default FriendsDetailsPage;
