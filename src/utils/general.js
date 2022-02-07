const toFormattedNumber = (value = 0) => {
  /* eslint-disable no-param-reassign */
  value = value.toString();
  let afterPoint = '';
  if (value.indexOf('.') > 0) {
    afterPoint = value.substring(value.indexOf('.'), value.length);
  }
  value = Math.floor(value);
  value = value.toString();
  let lastThree = value.substring(value.length - 3);
  const otherNumbers = value.substring(0, value.length - 3);
  if (otherNumbers !== '') lastThree = `,${lastThree}`;

  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
  /* eslint-enable no-param-reassign */
};

export default toFormattedNumber;
