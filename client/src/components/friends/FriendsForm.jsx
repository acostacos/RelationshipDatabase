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

  const { firstname, lastname } = formData;
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
