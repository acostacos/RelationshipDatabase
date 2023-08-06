import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editFriend, getFriends } from '../friendRequests';
import FriendsForm from '../FriendsForm';

function FriendsDetailsEdit() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: friend,
  } = useQuery({
    queryKey: ['friends', friendId],
    queryFn: () => getFriends(friendId),
  });

  const {
    mutate: editFriendMut,
  } = useMutation({
    mutationFn: editFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
      navigate('..');
    },
  });

  const handleFormSubmit = (formData) => {
    editFriendMut(formData);
  };

  return (
    <div id="FriendsDetailsEdit">
      <FriendsForm friend={friend} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default FriendsDetailsEdit;
