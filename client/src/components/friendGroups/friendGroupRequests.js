import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';
const friendGroupUrl = `${baseUrl}/group`;
export async function getFriendGroups(friendGroupId = null) {
  let url = friendGroupUrl;
  if (friendGroupId != null) {
    url += `/${friendGroupId}`;
  }

  const response = await axios.get(url);
  return response.data;
}

export async function createFriendGroup(friendGroupData) {
  const body = {
    ...friendGroupData,
  };

  const response = await axios.post(friendGroupUrl, body);
  return response.data;
}

export async function editFriendGroup(friendGroupData) {
  const body = {
    friend_group_id: friendGroupData.friendGroupId,
    ...friendGroupData,
  };

  const response = await axios.put(friendGroupUrl, body);
  return response.message;
}

export async function deleteFriendGroup(friendGroupId) {
  const options = {
    data: { friend_group_id: friendGroupId },
  };

  const response = await axios.delete(friendGroupUrl, options);
  return response.message;
}
