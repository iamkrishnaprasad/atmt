import { useState, useEffect } from 'react';

const useForm = (callback, validate, variant, initialValues = '') => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues !== '') setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values, variant));
    setIsSubmitting(true);
  };

  // const reset = (e) => {
  //   e?.preventDefault();
  //   setValues({});
  //   setErrors({});
  //   setIsSubmitting(false);
  // };

  // const handleClose = (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   console.log(errors);
  //   if (Object.keys(errors).length === 0) {
  //     setTimeout(toggle(), 2000);
  //   }
  // };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      // reset();
      // setTimeout(toggle(), 2000);
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
