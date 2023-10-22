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
import './FriendsDetailsDisplay.css';

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

  const {
    firstname,
    lastname,
    modify_date,
    last_interaction,
    birthday,
    work,
    significant_other,
    likes,
    dislikes,
    notes,
  } = friend;
  return (
    <div id="FriendsDetailsDisplay">
      <Loader isLoading={isLoading} />
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <h3 className="friend-name">
              {`${firstname} ${lastname}`}
            </h3>
            <Link linkTo="edit"><Button variant="outline-dark">Edit</Button></Link>
            <Button variant="outline-danger" onClick={showDeleteModal}>Delete</Button>
          </Stack>
          <p>
            Last Modified:
            {modify_date}
          </p>
        </Col>
      </Row>
      <Row className="info-row">
        <Col>
          <div className="info-section">
            <h5 className="info-label">Last Interaction</h5>
            <div className="info-content">{last_interaction}</div>
          </div>
        </Col>
        <Col>
          <div className="info-section">
            <h5 className="info-label">Birthday</h5>
            <div className="info-content">{birthday}</div>
          </div>
        </Col>
      </Row>
      <Row className="info-row">
        <Col>
          <div className="info-section">
            <h5 className="info-label">Work</h5>
            <div className="info-content">{work}</div>
          </div>
        </Col>
        <Col>
          <div className="info-section">
            <h5 className="info-label">Significant Other</h5>
            <div className="info-content">{significant_other}</div>
          </div>
        </Col>
      </Row>
      <Row className="info-row">
        <Col>
          <div className="info-section">
            <h5 className="info-label">Likes</h5>
            <div className="info-content">{likes}</div>
          </div>
        </Col>
        <Col>
          <div className="info-section">
            <h5 className="info-label">Dislikes</h5>
            <div className="info-content">{dislikes}</div>
          </div>
        </Col>
      </Row>
      <Row className="info-row">
        <Col>
          <div className="info-section">
            <h5 className="info-label">Notes</h5>
            <div className="info-content notes-content">{notes}</div>
          </div>
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
