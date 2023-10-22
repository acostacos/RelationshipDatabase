import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getFriendGroups } from '../friendGroupRequests';
import Loader from '../../shared/loader/Loader';
import ErrorPage from '../../error/ErrorPage';

function FriendGroupsDetailsPage() {
  const { friendGroupId } = useParams();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['friendGroups', friendGroupId],
    queryFn: () => getFriendGroups(friendGroupId),
  });

  return (
    <div id="FriendGroupsDetailsPage">
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

export default FriendGroupsDetailsPage;
