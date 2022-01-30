/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

import validate from './validateInfo';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Client';
    case 'edit':
      return 'Update Client';
    default:
      return 'Client';
  }
}

function ClientModal({ variant, isOpen, toggle, onSubmit, data }) {
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

  useEffect(() => {
    if (values?.type === 'I') setValues({ ...values, vatno: '', crno: '' });
  }, [values?.type]);

  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              md={{
                offset: 8,
                size: 4,
              }}
            >
              <FormGroup>
                <Label for="typeField">Client Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="typeField"
                  autoComplete="off"
                  value={values?.type}
                  invalid={!!errors?.type}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select Client Type</option>
                  <option value="B">Business</option>
                  <option value="I">Individual</option>
                </Input>
                <FormFeedback>{errors?.type}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <FormGroup>
                <Label for="nameField">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="nameField"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={values?.name}
                  invalid={!!errors?.name}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="50"
                />
                <FormFeedback>{errors?.name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <FormGroup>
                <Label for="altnameField">Name (in arabic)</Label>
                <Input
                  type="text"
                  name="altname"
                  id="altnameField"
                  placeholder="Enter Name (in arabic)"
                  autoComplete="off"
                  value={values?.altname}
                  invalid={!!errors?.altname}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="50"
                />
                <FormFeedback>{errors?.altname}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="vatnoField">VAT No.</Label>
                <Input
                  type="text"
                  name="vatno"
                  id="vatnoField"
                  placeholder="Enter VAT No."
                  autoComplete="off"
                  value={values?.vatno}
                  invalid={!!errors?.vatno}
                  onChange={handleChange}
                  disabled={variant === 'readonly' || values?.type === 'I'}
                  maxLength="15"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{errors?.vatno}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="crnumField">CR No.</Label>
                <Input
                  type="text"
                  name="crno"
                  id="crnumField"
                  placeholder="Enter CR No."
                  autoComplete="off"
                  value={values?.crno}
                  invalid={!!errors?.crno}
                  onChange={handleChange}
                  disabled={variant === 'readonly' || values?.type === 'I'}
                  maxLength="10"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{errors?.crno}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="phoneField">Phone No.</Label>
                <InputGroup>
                  <InputGroupText
                    style={{
                      borderTopRightRadius: '0px',
                      borderTopLeftRadius: '8px',
                      borderBottomRightRadius: '0px',
                      borderBottomLeftRadius: '8px',
                    }}
                  >
                    +966
                  </InputGroupText>
                  <Input
                    type="text"
                    name="phone"
                    id="phoneField"
                    placeholder="Enter Phone No."
                    autoCapitalize="off"
                    autoComplete="off"
                    value={values.phone}
                    invalid={!!errors?.phone}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                    maxLength="9"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/\D/g, '');
                      event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                    }}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </InputGroup>
                <FormFeedback>{errors.phone}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="landlineField">Landline No.</Label>
                <InputGroup>
                  <InputGroupText
                    style={{
                      borderTopRightRadius: '0px',
                      borderTopLeftRadius: '8px',
                      borderBottomRightRadius: '0px',
                      borderBottomLeftRadius: '8px',
                    }}
                  >
                    +966
                  </InputGroupText>
                  <Input
                    type="text"
                    name="landline"
                    id="landlineField"
                    placeholder="Enter Landline No."
                    autoCapitalize="off"
                    autoComplete="off"
                    value={values.landline}
                    invalid={!!errors?.landline}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                    maxLength="9"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/\D/g, '');
                      event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                    }}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </InputGroup>
                <FormFeedback>{errors.landline}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label for="websiteField">Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="websiteField"
                  placeholder="Enter Website"
                  autoComplete="off"
                  value={values?.website}
                  invalid={!!errors?.website}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="100"
                />
                <FormFeedback>{errors?.website}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <FormGroup>
                <Label for="emailField">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="emailField"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={values?.email}
                  invalid={!!errors?.email}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="100"
                />
                <FormFeedback>{errors?.email}</FormFeedback>
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
                  placeholder="Enter Street No."
                  autoComplete="off"
                  value={values?.buildingno}
                  invalid={!!errors?.buildingno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="40"
                />
                <FormFeedback>{errors?.buildingno}</FormFeedback>
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
                  autoComplete="off"
                  value={values?.streetno}
                  invalid={!!errors?.streetno}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="15"
                />
                <FormFeedback>{errors?.streetno}</FormFeedback>
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
                  autoComplete="off"
                  value={values?.district}
                  invalid={!!errors?.district}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="25"
                />
                <FormFeedback>{errors?.district}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="poboxField">P.O. Box</Label>
                <Input
                  type="text"
                  name="pobox"
                  id="poboxField"
                  placeholder="Enter P.O. Box"
                  autoComplete="off"
                  value={values?.pobox}
                  invalid={!!errors?.pobox}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="10"
                />
                <FormFeedback>{errors?.pobox}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="cityField">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="cityField"
                  placeholder="Enter City"
                  autoComplete="off"
                  value={values?.city}
                  invalid={!!errors?.city}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="20"
                />
                <FormFeedback>{errors?.city}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="citycodeField">City Code</Label>
                <Input
                  type="text"
                  name="citycode"
                  id="citycodeField"
                  placeholder="Enter City Code"
                  autoComplete="off"
                  value={values?.citycode}
                  invalid={!!errors?.citycode}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="10"
                />
                <FormFeedback>{errors?.citycode}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="countryField">Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="countryField"
                  placeholder="Enter Country"
                  autoComplete="off"
                  value={values?.country}
                  invalid={!!errors?.country}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="30"
                />
                <FormFeedback>{errors?.country}</FormFeedback>
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

export default ClientModal;
