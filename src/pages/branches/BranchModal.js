/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import validate from './validateInfo';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Branch';
    case 'edit':
      return 'Update Branch';
    default:
      return 'Branch';
  }
}

function BranchModal({ variant, isOpen, toggle, onSubmit, data }) {
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
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label for="nameField">Branch Name</Label>
            <Input
              type="text"
              name="name"
              id="nameField"
              placeholder="Enter Branch Name"
              autoCapitalize="off"
              autoComplete="off"
              value={values?.name}
              invalid={!!errors?.name}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              maxLength="50"
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altnameField">Branch Name (in arabic)</Label>
            <Input
              type="text"
              name="altname"
              id="altnameField"
              placeholder="Enter Branch Name"
              autoCapitalize="off"
              autoComplete="off"
              value={values?.altname}
              invalid={!!errors?.altname}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              maxLength="50"
            />
            <FormFeedback>{errors.altname}</FormFeedback>
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="vatnoField">VAT No.</Label>
                <Input
                  type="text"
                  name="vatno"
                  id="vatnoField"
                  placeholder="Enter VAT No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.vatno}
                  invalid={!!errors?.vatno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  minLength="15"
                  maxLength="15"
                  required
                />
                <FormFeedback>{errors.vatno}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="crnoField">CR No.</Label>
                <Input
                  type="text"
                  name="crno"
                  id="crnoField"
                  placeholder="Enter CR No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.crno}
                  invalid={!!errors?.crno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  minLength="10"
                  maxLength="10"
                  required
                />
                <FormFeedback>{errors.crno}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="buildingnoField">Building No.</Label>
                <Input
                  type="text"
                  name="buildingno"
                  id="buildingnoField"
                  placeholder="Enter Building No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.buildingno}
                  invalid={!!errors?.buildingno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="40"
                />
                <FormFeedback>{errors.buildingno}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="streetnoField">Street No.</Label>
                <Input
                  type="text"
                  name="streetno"
                  id="streetnoField"
                  placeholder="Enter Street No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.streetno}
                  invalid={!!errors?.streetno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="15"
                />
                <FormFeedback>{errors.streetno}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="districtField">District</Label>
                <Input
                  type="text"
                  name="district"
                  id="districtField"
                  placeholder="Enter District"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.district}
                  invalid={!!errors?.district}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="25"
                />
                <FormFeedback>{errors.district}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="poboxField"> P.O. Box</Label>
                <Input
                  type="text"
                  name="pobox"
                  id="poboxField"
                  placeholder="Enter P.O. Box"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.pobox}
                  invalid={!!errors?.pobox}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="10"
                />
                <FormFeedback>{errors.pobox}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="cityField">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="cityField"
                  placeholder="Enter City"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.city}
                  invalid={!!errors?.city}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="20"
                />
                <FormFeedback>{errors.city}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="citycodeField">City Code</Label>
                <Input
                  type="text"
                  name="citycode"
                  id="citycodeField"
                  placeholder="Enter City Code"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.citycode}
                  invalid={!!errors?.citycode}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="10"
                />
                <FormFeedback>{errors.citycode}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="countryField">Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="countryField"
                  placeholder="Enter Country"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.country}
                  invalid={!!errors?.country}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="30"
                />
                <FormFeedback>{errors.country}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="phoneField">Phone No.</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phoneField"
                  placeholder="Enter Phone No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.phone}
                  invalid={!!errors?.phone}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxLength="9"
                />
                <FormFeedback>{errors.phone}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="landlineField">Landline No.</Label>
                <Input
                  type="text"
                  name="landline"
                  id="landlineField"
                  placeholder="Enter Landline No."
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.landline}
                  invalid={!!errors?.landline}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxLength="9"
                />
                <FormFeedback>{errors.landline}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="emailField">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="emailField"
                  placeholder="Enter Email Address"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.email}
                  invalid={!!errors?.email}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="100"
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="websiteField">Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="websiteField"
                  placeholder="Enter Website"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={values?.website}
                  invalid={!!errors?.website}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="100"
                />
                <FormFeedback>{errors.website}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
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

export default BranchModal;
