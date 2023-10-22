import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Container, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getFriendGroups } from '../friendGroupRequests';
import Loader from '../../shared/loader/Loader';
import ErrorPage from '../../error/ErrorPage';
import Link from '../../shared/link/Link';
import './FriendGroupsListPage.css';

function FriendGroupsListPage() {
  const navigate = useNavigate();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: friendGroups,
  } = useQuery({
    queryKey: ['friendGroups'],
    queryFn: () => getFriendGroups(),
  });

  const onClickAddFriendGroup = () => {
    navigate('new');
  };

  return (
    <div id="FriendGroupsListPage">
      <Loader isLoading={isLoading} />
      {isError && (
        <ErrorPage errorMessage={JSON.stringify(error)} />
      )}
      {isSuccess && (
        <Container>
          <Button className="add-friend-group-button" variant="outline-primary" onClick={onClickAddFriendGroup}>Add New Friend Group</Button>
          <ListGroup as="ul" className="friend-groups-list-group">
            {friendGroups && friendGroups.map((group) => {
              const { friend_group_id: friendGroupId, name } = group;
              return (
                <ListGroupItem key={friendGroupId} variant="light" as="li">
                  <Link linkTo={`/groups/${friendGroupId}`}>
                    {name}
                  </Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Container>
      )}
    </div>
  );
}

export default FriendGroupsListPage;
