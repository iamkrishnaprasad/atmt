import { useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import validate from './validateInfo';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Brand';
    case 'edit':
      return 'Update Brand';
    default:
      return 'Brand';
  }
}

function BrandModal({ variant, isOpen, toggle, onSubmit, data }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(data);
  }, [variant, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values, variant));
    setIsSubmitting(true);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    setIsSubmitting(false);
    setErrors({});
    toggle();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit(values);
      setIsSubmitting(false);
      setErrors({});
      toggle();
    }
  }, [errors]);
  return (
    <Modal isOpen={isOpen} style={{ zoom: '65%' }}>
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="nameField"
              placeholder="Enter Brand"
              autoComplete="off"
              value={values?.name}
              invalid={!!errors?.name}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              minLength="0"
              maxLength="50"
              required
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {variant === 'readonly' ? null : (
          <Button color="success" type="submit" form="modalForm">
            {variant === 'add' ? 'Add' : 'Update'}
          </Button>
        )}
        <Button color="danger" onClick={handleClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default BrandModal;
