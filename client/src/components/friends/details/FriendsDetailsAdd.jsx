import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import { createFriend } from '../friendRequests';
import FriendsForm from '../FriendsForm';

function FriendsDetailsAdd() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: createFriendMut,
  } = useMutation({
    mutationFn: createFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
      navigate('..', { relative: 'path' });
      // TODO: On Create, return friend id and then load friendid page
    },
  });

  const handleFormSubmit = (formData) => {
    createFriendMut(formData);
  };

  return (
    <div id="FriendsDetailsAdd">
      <Container>
        <FriendsForm onSubmit={handleFormSubmit} />
      </Container>
    </div>
  );
}

export default FriendsDetailsAdd;
