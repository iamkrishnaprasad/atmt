import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './Widget.module.scss';

function Widget({ title, className, headerClass, children, options, ...restProps }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={styles.widget} {...restProps}>
      {title && <div className={classNames(headerClass, styles.title)}>{title}</div>}
      <div className={className}>{children}</div>
    </section>
  );
}

Widget.defaultProps = {
  title: null,
  className: '',
  headerClass: '',
  children: [],
  options: {},
};

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  headerClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
};

export default Widget;
