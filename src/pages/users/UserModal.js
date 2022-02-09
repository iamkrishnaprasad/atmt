/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      return 'Add User';
    case 'edit':
      return 'Update User';
    default:
      return 'User';
  }
}

function UserModal({ variant, isOpen, toggle, onSubmit, data }) {
  const [showPassword, setShowPassword] = useState(false);
  const userRoles = useSelector((state) => state.userRoles.data);
  const branches = useSelector((state) => state.branches.data);

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
    <Modal isOpen={isOpen} style={{ zoom: '65%' }} size="lg">
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <Row>
            <Col md={6}>
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
                  onInput={(event) => {
                    event.target.value = event.target.value.replace('  ', ' ');
                  }}
                  onKeyPress={(event) => {
                    event.target.value = event.target.value.replace('  ', ' ');
                  }}
                />
                <FormFeedback>{errors?.name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="usernameField">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="usernameField"
                  placeholder="Enter Username"
                  autoComplete="off"
                  value={values?.username}
                  invalid={!!errors?.username}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="20"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase();
                  }}
                  onKeyPress={(event) => {
                    event.target.value = event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase();
                  }}
                />
                <FormFeedback>{errors?.username}</FormFeedback>
              </FormGroup>
            </Col>
            {variant !== 'edit' ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="passwordField">Password</Label>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="passwordField"
                      placeholder="Enter Password"
                      autoComplete="off"
                      value={values?.password}
                      invalid={!!errors?.password}
                      onChange={handleChange}
                      disabled={variant === 'readonly'}
                      maxLength="20"
                      onInput={(event) => {
                        event.target.value = event.target.value.replace(' ', '');
                      }}
                      onKeyPress={(event) => {
                        event.target.value = event.target.value.replace(' ', '');
                      }}
                    />
                    <InputGroupText
                      style={{
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '0px',
                        borderBottomRightRadius: '8px',
                        borderBottomLeftRadius: '0px',
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <i className="eva eva-eye-outline" /> : <i className="eva eva-eye-off-outline" />}
                    </InputGroupText>
                    <FormFeedback>{errors?.password}</FormFeedback>
                  </InputGroup>
                </FormGroup>
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col>
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
                <Label for="contactField">Contact No.</Label>
                <Input
                  type="input"
                  name="contact"
                  id="contactField"
                  placeholder="Enter Contact No."
                  autoComplete="off"
                  value={values?.contact}
                  invalid={!!errors?.contact}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="9"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{errors?.contact}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="userRoleIdField">User Role</Label>
                <Input
                  type="select"
                  name="userRoleId"
                  id="userRoleIdField"
                  value={values?.userRoleId}
                  invalid={!!errors?.userRoleId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select User Role</option>
                  {userRoles.map((userRole) => (
                    <option value={userRole.id} key={userRole.id}>
                      {userRole.role}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.userRoleId}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="branchIdField">Branch</Label>
                <Input
                  type="select"
                  name="branchId"
                  id="branchIdField"
                  value={values?.branchId}
                  invalid={!!errors?.branchId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select Branch</option>
                  {branches.map((branch) => (
                    <option value={branch.id} key={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.branchId}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          {variant === 'edit' ? (
            <FormGroup check>
              <Input
                type="checkbox"
                name="isActive"
                id="isActiveField"
                checked={values?.isActive}
                // invalid={!!errors?.isActive}
                onChange={handleChange}
                disabled={variant === 'readonly'}
              />
              <Label for="isActiveField" check>
                Is Active?
              </Label>
            </FormGroup>
          ) : null}
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

export default UserModal;
