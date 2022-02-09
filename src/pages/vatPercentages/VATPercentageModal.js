/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import validate from './validateInfo';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add VAT';
    case 'edit':
      return 'Update VAT';
    default:
      return 'VAT';
  }
}

function VATPercentageModal({ variant, isOpen, toggle, onSubmit, data }) {
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
              name="vatPercentage"
              id="vatPercentageField"
              placeholder="Enter VAT"
              autoComplete="off"
              value={values?.vatPercentage}
              invalid={!!errors?.vatPercentage}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              maxLength="2"
              onInput={(event) => {
                event.target.value = event.target.value.replace(/\D/g, '');
                event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
              }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              required
            />
            <FormFeedback>{errors.vatPercentage}</FormFeedback>
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

export default VATPercentageModal;
