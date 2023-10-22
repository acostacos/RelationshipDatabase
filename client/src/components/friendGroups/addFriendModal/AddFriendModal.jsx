import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Container, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../shared/loader/Loader';
import ErrorPage from '../../error/ErrorPage';
import { getFriendGroupMembers } from '../friendGroupMemberRequests';
import './AddFriendModal.css';

function AddFriendModal({
  friendGroupId,
  isVisible,
  onClose,
  onConfirm,
}) {
  const queryClient = useQueryClient();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: friends,
  } = useQuery({
    queryKey: ['friendGroupMembers', 'not'],
    queryFn: () => getFriendGroupMembers(friendGroupId, true),
  });

  const [friendsToAdd, setFriendsToAdd] = useState({});

  const handleListItemClick = (friendId) => {
    const newState = { ...friendsToAdd };
    if (friendsToAdd[friendId]) {
      delete newState[friendId];
      setFriendsToAdd(newState);
    } else {
      newState[friendId] = true;
      setFriendsToAdd(newState);
    }
  };

  const handleCloseClick = () => {
    setFriendsToAdd([]);
    onClose();
  };

  const handleAddClick = () => {
    const friendIds = Object.keys(friendsToAdd);
    onConfirm(friendIds);

    queryClient.invalidateQueries(['friends', 'friendGroupMembers']);
    setFriendsToAdd([]);
  };

  return (
    <Modal
      show={isVisible}
      onHide={onClose}
      size="lg"
      centered
      className="AddFriendModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add Friends
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Loader isLoading={isLoading} />
        {isError && (
          <ErrorPage errorMessage={JSON.stringify(error)} />
        )}
        {isSuccess && (
          <Container>
            <ListGroup as="ul" className="add-friend-list-group">
              {friends && friends.map((friend) => {
                const { friend_id: friendId, firstname, lastname } = friend;
                return (
                  <ListGroupItem
                    key={friendId}
                    variant="light"
                    as="li"
                    active={friendsToAdd[friendId]}
                    action
                    onClick={() => handleListItemClick(friendId)}
                  >
                    {`${firstname} ${lastname}`}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseClick}>Close</Button>
        <Button variant="outline-primary" onClick={handleAddClick}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

AddFriendModal.propTypes = {
  friendGroupId: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
export default AddFriendModal;
