import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Navbar,
  NavbarToggler,
  NavItem,
  Nav,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import withUser from 'utils/withUser';
import { MY_POLLS, PUBLIC_POLLS } from 'routes';

const menuItems = [
  {
    url: MY_POLLS,
    title: 'MY POLLS',
  },
  {
    url: PUBLIC_POLLS,
    title: 'PUBLIC POLLS',
  },
];

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func,
    location: PropTypes.object,
    pathname: PropTypes.string,
  };
  static defaultProps = {
    user: null,
  };

  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { user, onLogout, location: { pathname } } = this.props;
    const { isOpen } = this.state;

    return (
      <Navbar color="light" light expand="md">
        <NavLink to='/' className="mr-auto">
          VoteApp
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user && menuItems.map((item, index) => (
              <NavItem
                key={index}
                className={pathname === item.url ? 'active' : ''}
              >
                <NavLink
                  activeClassName="active"
                  className="nav-link ml-2 ml-lg-1 fz-18 fw-500"
                  exact
                  to={item.url}
                >
                  {item.title}
                </NavLink>
              </NavItem>))}
            {user && <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user.fullName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  {user.email}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={onLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default compose(
  withUser,
  withRouter,
)(Header);
