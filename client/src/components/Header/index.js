import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AppLayout from 'layouts/AppLayout';
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
  };
  static defaultProps = {
    user: null,
  };

  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { user, onLogout } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to='/'>
            VoteApp
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user && menuItems.map((item, index) => (
                <NavItem key={index}>
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
      </div>
    );
  }
}

export default AppLayout(Header);
