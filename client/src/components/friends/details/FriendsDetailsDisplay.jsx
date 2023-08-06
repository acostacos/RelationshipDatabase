import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  Col, Row, Button, Stack,
} from 'react-bootstrap';
import { getFriends, deleteFriend } from '../friendRequests';
import Link from '../../shared/link/Link';
import Modal from '../../shared/modal/Modal';
import Loader from '../../shared/loader/Loader';

function FriendsDetailsDisplay() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { friendId } = useParams();
  const {
    data: friend,
  } = useQuery({
    queryKey: ['friends', friendId],
    queryFn: () => getFriends(friendId),
  });

  const {
    isLoading,
    mutate: deleteFriendMut,
  } = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
      navigate('..', { relative: 'path' });
    },
  });

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteVisible(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteVisible(false);
  };

  const onConfirmDelete = () => {
    setIsDeleteVisible(false);
    deleteFriendMut(friend.friend_id);
  };

  return (
    <div id="FriendsDetailsDisplay">
      <Loader isLoading={isLoading} />
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <h3 className="friend-name">
              {`${friend.firstname} ${friend.lastname}`}
            </h3>
            <Link linkTo="edit"><Button variant="outline-dark">Edit</Button></Link>
            <Button variant="outline-danger" onClick={showDeleteModal}>Delete</Button>
          </Stack>
        </Col>
      </Row>
      <Modal
        isVisible={isDeleteVisible}
        onClose={hideDeleteModal}
        onConfirm={onConfirmDelete}
        title="Delete Friend"
        body="Are you sure you want to delete this friend?"
      />
    </div>
  );
}

export default FriendsDetailsDisplay;
