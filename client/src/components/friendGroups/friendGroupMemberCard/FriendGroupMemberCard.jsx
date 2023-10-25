import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Button } from 'react-bootstrap';

function FriendGroupMemberCard({ friend }) {
  const navigate = useNavigate();

  const onGoToClick = () => {
    navigate(`/friends/${friend.friend_id}`);
  };

  return (
    <Card className="friend-group-member-card">
      <Card.Body>
        <Card.Title>
          {`${friend.firstname} ${friend.lastname}`}
        </Card.Title>
        <Stack direction="horizontal" gap={3}>
          <Button variant="outline-primary" onClick={onGoToClick}>Go to page</Button>
          <Button variant="outline-danger">Delete</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

FriendGroupMemberCard.propTypes = {
  friend: PropTypes.shape({
    friend_id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
};

export default FriendGroupMemberCard;
