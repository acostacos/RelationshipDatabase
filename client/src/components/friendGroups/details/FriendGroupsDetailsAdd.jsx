import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import { createFriendGroup } from '../friendGroupRequests';
import FriendGroupsForm from '../FriendGroupsForm';

function FriendGroupsDetailsAdd() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: createFriendGroupMut,
  } = useMutation({
    mutationFn: createFriendGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['friendGroups']);
      if (data && data.friend_group_id) {
        navigate(`../${data.friend_group_id}`, { relative: 'path' });
      } else {
        navigate('..', { relative: 'path' });
      }
    },
  });

  const handleFormSubmit = (formData) => {
    createFriendGroupMut(formData);
  };

  return (
    <div id="FriendGroupsDetailsAdd">
      <Container>
        <FriendGroupsForm onSubmit={handleFormSubmit} />
      </Container>
    </div>
  );
}

export default FriendGroupsDetailsAdd;
