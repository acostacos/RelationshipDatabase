import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Container, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getFriends } from '../friendRequests';
import Loader from '../../shared/loader/Loader';
import ErrorPage from '../../error/ErrorPage';
import Link from '../../shared/link/Link';
import './FriendsListPage.css';

function FriendsListPage() {
  const navigate = useNavigate();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: friends,
  } = useQuery({
    queryKey: ['friends'],
    queryFn: () => getFriends(),
  });

  const onClickAddFriend = () => {
    navigate('new');
  };

  return (
    <div id="FriendsListPage">
      <Loader isLoading={isLoading} />
      {isError && (
        <ErrorPage errorMessage={JSON.stringify(error)} />
      )}
      {isSuccess && (
        <Container>
          <Button className="add-friend-button" variant="outline-primary" onClick={onClickAddFriend}>Add New Friend</Button>
          <ListGroup as="ul">
            {friends && friends.map((friend) => {
              const { friend_id: friendId, firstname, lastname } = friend;
              return (
                <ListGroupItem key={friendId} variant="light" as="li">
                  <Link linkTo={`/friends/${friendId}`}>
                    {`${firstname} ${lastname}`}
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

export default FriendsListPage;
