import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import {
  Navbar,
  Nav,
  // NavItem,
  NavLink,
  // InputGroupAddon,
  // InputGroup,
  // Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavItem,
  // Form,
  // FormGroup,
} from 'reactstrap';

// import { logoutUser } from "../../actions/auth";
import { closeSidebar, logoutUser, openSidebar } from '../../redux';
// import { closeSidebar, openSidebar } from '../../actions/navigation';
import MenuIcon from '../Icons/HeaderIcons/MenuIcon';
// import SearchBarIcon from '../Icons/HeaderIcons/SearchBarIcon';
// import SearchIcon from '../Icons/HeaderIcons/SearchIcon';

import ProfileIcon from '../../assets/navbarMenus/profileIcons/ProfileIcon';
// import MessagesIcon from '../../assets/navbarMenus/profileIcons/MessagesIcon';
// import TasksIcon from '../../assets/navbarMenus/profileIcons/TasksIcon';

// import logoutIcon from '../../assets/navbarMenus/profileIcons/logoutOutlined.svg';
// import basketIcon from '../../assets/navbarMenus/basketIcon.svg';
// import calendarIcon from '../../assets/navbarMenus/calendarIcon.svg';
// import envelopeIcon from '../../assets/navbarMenus/envelopeIcon.svg';
// import mariaImage from '../../assets/navbarMenus/mariaImage.jpg';
// import notificationImage from '../../assets/navbarMenus/notificationImage.jpg';
// import userImg from '../../assets/user.svg';

import s from './Header.module.scss';
import 'animate.css';

function Header() {
  const sidebarOpened = useSelector((state) => state.navigation.sidebarOpened);
  const profile = useSelector((state) => state.profile.data);

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  // const [notificationsOpen, setNotificationsOpen] = useState(false);
  // const toggleNotifications = () => {
  //   setNotificationsOpen(!notificationsOpen);
  // };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSidebar = () => {
    // if (sidebarOpened) {
    //   dispatch(closeSidebar());
    // } else {
    //   dispatch(openSidebar());
    // }
    dispatch(sidebarOpened ? closeSidebar() : openSidebar());
  };

  const doLogout = () => {
    dispatch(logoutUser());
    window.location.pathname = '/login';
  };

  return (
    <Navbar className={`${s.root} d-print-none`}>
      <div>
        <NavLink onClick={() => toggleSidebar()} className={`d-md-none mr-3 ${s.navItem}`} href="#">
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
      {/* <Form className="d-none d-sm-block" inline>
              <FormGroup>
                <InputGroup className="input-group-no-border">
                  <Input id="search-input" placeholder="Search Dashboard" className="focus" />
                  <InputGroupAddon addonType="prepend">
                    <span>
                      <SearchBarIcon />
                    </span>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form> */}
      <Nav className="ml-auto">
        <Dropdown isOpen={menuOpen} toggle={() => toggleMenu()} nav id="basic-nav-dropdown" className="ml-3">
          <DropdownToggle nav caret className="navbar-dropdown-toggle">
            {/* <span className={`${s.avatar} rounded-circle float-left mr-2`}>
              <img src={userImg} alt="User" />
            </span> */}
            <span className="small d-sm-block ml-1 mr-2 body-1">{profile.name}</span>
          </DropdownToggle>
          <DropdownMenu right className="navbar-dropdown profile-dropdown" style={{ width: '194px' }}>
            {/* <DropdownItem
              className={s.dropdownProfileItem}
              // eslint-disable-next-line react/no-unstable-nested-components
              onClick={() => <Redirect to="/profile" />}
            >
              <ProfileIcon />
              <span>Profile</span>
            </DropdownItem> */}
            <DropdownItem
              onClick={() => doLogout()}
              className={s.dropdownProfileItem}
              style={{
                marginTop: '48px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#005693',
                color: '#fff',
              }}
            >
              <i className="eva eva-log-out-outline" />
              <span style={{ color: '#fff' }}>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}

export default withRouter(Header);
