import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, FormGroup, FormLabel, FormControl, Form,
} from 'react-bootstrap';

function FriendGroupsForm({
  onSubmit,
  friendGroup,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(friendGroup);
  }, [friendGroup]);

  const handleFormDataChange = (e, fieldname) => {
    const updatedData = { ...formData };
    updatedData[fieldname] = e.target.value;
    setFormData(updatedData);
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  const { name } = formData;
  return (
    <div id="FriendGroupsForm">
      <Form>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => handleFormDataChange(e, 'name')}
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

FriendGroupsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  friendGroup: PropTypes.shape({
    name: PropTypes.string,
  }),
};

FriendGroupsForm.defaultProps = {
  friendGroup: {},
};

export default FriendGroupsForm;
