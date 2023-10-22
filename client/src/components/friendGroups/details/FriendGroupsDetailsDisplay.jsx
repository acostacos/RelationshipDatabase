import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  Col, Row, Button, Stack,
} from 'react-bootstrap';
import { getFriendGroups, deleteFriendGroup } from '../friendGroupRequests';
import Link from '../../shared/link/Link';
import Modal from '../../shared/modal/Modal';
import Loader from '../../shared/loader/Loader';
import AddFriendModal from '../addFriendModal/AddFriendModal';
import { addFriendToGroup, getFriendGroupMembers } from '../friendGroupMemberRequests';
import './FriendGroupsDetailsDisplay.css';
import FriendGroupMemberCard from '../friendGroupMemberCard/FriendGroupMemberCard';

function FriendGroupsDetailsDisplay() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { friendGroupId } = useParams();
  const {
    data: friendGroup,
  } = useQuery({
    queryKey: ['friendGroups', friendGroupId],
    queryFn: () => getFriendGroups(friendGroupId),
  });

  const {
    data: friendMembers,
  } = useQuery({
    queryKey: ['friendGroupMembers'],
    queryFn: () => getFriendGroupMembers(friendGroupId),
  });

  const {
    isLoading: isDeleteFriendLoading,
    mutate: deleteFriendGroupMut,
  } = useMutation({
    mutationFn: deleteFriendGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['friendGroups']);
      navigate('..', { relative: 'path' });
    },
  });

  const {
    isLoading: isAddFriendLoading,
    mutate: addFriendToGroupMut,
  } = useMutation({
    mutationFn: ({ friendGroupId: groupId, friendIds }) => addFriendToGroup(groupId, friendIds),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendGroupMembers']);
    },
  });

  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showAddFriendModal = () => {
    setIsAddVisible(true);
  };

  const hideAddFriendModal = () => {
    setIsAddVisible(false);
  };

  const onConfirmAddFriends = (friendIds) => {
    addFriendToGroupMut({ friendGroupId: friendGroup.friend_group_id, friendIds });
    setIsAddVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteVisible(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteVisible(false);
  };

  const onConfirmDelete = () => {
    setIsDeleteVisible(false);
    deleteFriendGroupMut(friendGroup.friend_group_id);
  };

  const { friend_group_id: groupId, name } = friendGroup;
  return (
    <div id="FriendGroupsDetailsDisplay">
      <Loader isLoading={isDeleteFriendLoading || isAddFriendLoading} />
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <h3 className="friend-group-name">
              {name}
            </h3>
            <Button variant="outline-primary" onClick={showAddFriendModal}>Add Friend</Button>
            <Link linkTo="edit"><Button variant="outline-dark">Edit</Button></Link>
            <Button variant="outline-danger" onClick={showDeleteModal}>Delete</Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="friend-group-member-card-group">
            {friendMembers && friendMembers.map((friend) => (
              <FriendGroupMemberCard friend={friend} />
            ))}
          </div>
        </Col>
      </Row>
      <Modal
        isVisible={isDeleteVisible}
        onClose={hideDeleteModal}
        onConfirm={onConfirmDelete}
        title="Delete Friend Group"
        body="Are you sure you want to delete this friend group?"
      />
      <AddFriendModal
        friendGroupId={groupId}
        isVisible={isAddVisible}
        onClose={hideAddFriendModal}
        onConfirm={onConfirmAddFriends}
      />
    </div>
  );
}

export default FriendGroupsDetailsDisplay;
