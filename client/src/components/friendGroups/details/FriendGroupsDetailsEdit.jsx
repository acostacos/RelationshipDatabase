import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editFriendGroup, getFriendGroups } from '../friendGroupRequests';
import FriendGroupsForm from '../FriendGroupsForm';

function FriendGroupsDetailsEdit() {
  const navigate = useNavigate();
  const { friendGroupId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: friendGroup,
  } = useQuery({
    queryKey: ['friendGroups', friendGroupId],
    queryFn: () => getFriendGroups(friendGroupId),
  });

  const {
    mutate: editFriendGroupMut,
  } = useMutation({
    mutationFn: editFriendGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['friendGroups']);
      navigate('..');
    },
  });

  const handleFormSubmit = (formData) => {
    editFriendGroupMut(formData);
  };

  return (
    <div id="FriendGroupsDetailsEdit">
      <FriendGroupsForm friendGroup={friendGroup} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default FriendGroupsDetailsEdit;
