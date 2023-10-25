import React, { useState, useEffect } from 'react';
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
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const {
    refetch,
    isSuccess,
    isLoading,
    isError,
    error,
    data: friends,
  } = useQuery({
    queryKey: ['friends'],
    queryFn: () => getFriends(null, searchVal),
  });

  useEffect(() => {
    refetch();
  }, [searchVal]);

  const onClickAddFriend = () => {
    navigate('new');
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchVal(value);
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
          <div className="search">
            <input
              type="text"
              className="searchbar"
              value={searchVal}
              onChange={onSearchChange}
            />
          </div>
          <ListGroup as="ul" className="friends-list-group">
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
