import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';
const friendGroupMemberUrl = `${baseUrl}/group/member`;

export async function getFriendGroupMembers(friendGroupId, notIn = false) {
  let url = `${friendGroupMemberUrl}/${friendGroupId}`;
  if (notIn) {
    url += '?not_in=true';
  }

  const response = await axios.get(url);
  return response.data;
}

export async function addFriendToGroup(friendGroupId, friendIds) {
  const body = {
    friend_group_id: friendGroupId,
    friend_ids: friendIds,
  };

  const response = await axios.post(friendGroupMemberUrl, body);
  return response.data;
}
