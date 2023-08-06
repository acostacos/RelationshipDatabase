import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BModal } from 'react-bootstrap';

function Modal({
  isVisible,
  onClose,
  onConfirm,
  title,
  body,
}) {
  return (
    <BModal show={isVisible} onHide={onClose}>
      <BModal.Header closeButton>
        <BModal.Title>{title}</BModal.Title>
      </BModal.Header>
      <BModal.Body>{body}</BModal.Body>
      <BModal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={onConfirm}>
          Delete
        </Button>
      </BModal.Footer>
    </BModal>
  );
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

Modal.defaultProps = {
  body: '',
};

export default Modal;
