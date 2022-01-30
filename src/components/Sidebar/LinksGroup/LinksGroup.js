/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';
import { Route } from 'react-router';
import classnames from 'classnames';

import styles from './LinksGroup.module.scss';

function LinksGroup({
  header,
  link,
  exact,
  onActiveSidebarItemChange,
  activeItem,
  index,
  childrenLinks,
  isHeader,
  className,
  iconName,
  label,
  labelColor,
  badge,
  deep,
}) {
  const [headerLinkClicked, setHeaderLinkClicked] = useState(false);

  // eslint-disable-next-line no-shadow
  const togglePanelCollapse = (link, e) => {
    onActiveSidebarItemChange(link);
    setHeaderLinkClicked(!headerLinkClicked);
    e.preventDefault();
  };

  const isOpen = activeItem && activeItem.includes(index) && headerLinkClicked;

  if (!childrenLinks) {
    if (isHeader) {
      return (
        <li className={[styles.headerLink, className].join(' ')}>
          <NavLink to={link} activeClassName={styles.headerLinkActive} exact={exact}>
            <span className={styles.icon}>{iconName}</span>
            {header}
            {label && <sup className={`text-${labelColor || 'warning'}`}>{label}</sup>}
            {badge && (
              <Badge className={styles.badge} color="secondary-red" pill>
                {badge}
              </Badge>
            )}
          </NavLink>
        </li>
      );
    }
    return (
      <li>
        <NavLink
          to={link}
          activeClassName={styles.headerLinkActive}
          onClick={(e) => {
            if (link.includes('menu')) {
              e.preventDefault();
            }
          }}
          exact={exact}
        >
          <i className="fa fa-circle text-primary mr-2" /> {header}
        </NavLink>
      </li>
    );
  }
  return (
    <Route
      path={link}
      // eslint-disable-next-line react/no-children-prop
      children={(params) => {
        const { match } = params;
        return (
          <li className={classnames({ [styles.headerLink]: isHeader }, className)}>
            <a
              className={classnames('d-flex', { [styles.headerLinkActive]: match }, { [styles.collapsed]: isOpen })}
              onClick={(e) => togglePanelCollapse(link, e)}
              href="#top"
            >
              {isHeader ? <span className={styles.icon}>{iconName}</span> : null}
              {header} {label && <sup className={`text-${labelColor || 'warning'} ml-1`}>{label}</sup>}
              <b className={['fa fa-angle-right', styles.caret].join(' ')} />
            </a>
            <Collapse className={styles.panel} isOpen={isOpen}>
              <ul>
                {childrenLinks &&
                  childrenLinks.map((child, ind) => (
                    <LinksGroup
                      onActiveSidebarItemChange={onActiveSidebarItemChange}
                      activeItem={activeItem}
                      header={child.header}
                      link={child.link}
                      index={child.index}
                      childrenLinks={child.childrenLinks}
                      deep={deep + 1}
                      // eslint-disable-next-line react/no-array-index-key
                      key={ind}
                    />
                  ))}
              </ul>
            </Collapse>
          </li>
        );
      }}
    />
  );
}

LinksGroup.defaultProps = {
  header: '',
  link: '',
  childrenLink: null,
  childrenLinks: null,
  className: '',
  label: '',
  activeItem: '',
  isHeader: false,
  deep: 0,
  exact: true,
};

LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  childrenLinks: PropTypes.array,
  iconName: PropTypes.object,
  className: PropTypes.string,
  badge: PropTypes.string,
  label: PropTypes.string,
  activeItem: PropTypes.string,
  isHeader: PropTypes.bool,
  index: PropTypes.string,
  deep: PropTypes.number,
  onActiveSidebarItemChange: PropTypes.func,
  labelColor: PropTypes.string,
  exact: PropTypes.bool,
};

export default withRouter(LinksGroup);
