import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';
const friendUrl = `${baseUrl}/friend`;
export async function getFriends(friendId = null, search = '') {
  let url = friendUrl;
  if (friendId != null) {
    url += `/${friendId}`;
  }
  if (search) {
    url += `?search=${search}`;
  }

  const response = await axios.get(url);
  return response.data;
}

export async function createFriend(friendData) {
  const body = {
    ...friendData,
  };

  const response = await axios.post(friendUrl, body);
  return response.data;
}

export async function editFriend(friendData) {
  const body = {
    friend_id: friendData.friendId,
    ...friendData,
  };

  const response = await axios.put(friendUrl, body);
  return response.message;
}

export async function deleteFriend(friendId) {
  const options = {
    data: { friend_id: friendId },
  };

  const response = await axios.delete(friendUrl, options);
  return response.message;
}
