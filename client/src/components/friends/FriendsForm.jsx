import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, FormGroup, FormLabel, FormControl, Form,
} from 'react-bootstrap';

function FriendsForm({
  onSubmit,
  friend,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(friend);
  }, [friend]);

  const handleFormDataChange = (e, fieldname) => {
    const updatedData = { ...formData };
    updatedData[fieldname] = e.target.value;
    setFormData(updatedData);
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  const {
    firstname,
    lastname,
    last_interaction,
    birthday,
    work,
    significant_other,
    likes,
    dislikes,
    notes,
  } = formData;
  return (
    <div id="FriendsForm">
      <Form>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="firstname">
              <FormLabel>First name</FormLabel>
              <FormControl
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => handleFormDataChange(e, 'firstname')}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3" controlId="lastname">
              <FormLabel>Last name</FormLabel>
              <FormControl
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => handleFormDataChange(e, 'lastname')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="last_interaction">
              <FormLabel>Last Interaction</FormLabel>
              <FormControl
                type="date"
                value={last_interaction}
                onChange={(e) => handleFormDataChange(e, 'last_interaction')}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3" controlId="birthday">
              <FormLabel>Birthday</FormLabel>
              <FormControl
                type="date"
                value={birthday}
                onChange={(e) => handleFormDataChange(e, 'birthday')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="work">
              <FormLabel>Work</FormLabel>
              <FormControl
                type="text"
                placeholder="Work"
                value={work}
                onChange={(e) => handleFormDataChange(e, 'work')}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3" controlId="significant_other">
              <FormLabel>Significant Other</FormLabel>
              <FormControl
                type="text"
                placeholder="Significant Other"
                value={significant_other}
                onChange={(e) => handleFormDataChange(e, 'significant_other')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="likes">
              <FormLabel>Likes</FormLabel>
              <FormControl
                type="text"
                placeholder="Likes"
                value={likes}
                onChange={(e) => handleFormDataChange(e, 'likes')}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3" controlId="dislikes">
              <FormLabel>Dislikes</FormLabel>
              <FormControl
                type="text"
                placeholder="Dislikes"
                value={dislikes}
                onChange={(e) => handleFormDataChange(e, 'dislikes')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="notes">
              <FormLabel>Notes</FormLabel>
              <FormControl
                as="textarea"
                value={notes}
                rows="10"
                onChange={(e) => handleFormDataChange(e, 'notes')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button variant="outline-dark" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

FriendsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  friend: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
};

FriendsForm.defaultProps = {
  friend: {},
};

export default FriendsForm;
