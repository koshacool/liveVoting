import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, NavLink } from 'react-router-dom';
import { Container, Row, Navbar, Collapse, Col, NavbarToggler, Nav, NavItem, Button, 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand } from 'reactstrap';
import AppLayout from 'layouts/AppLayout';
import { onLogout } from 'utils/onLogout';


const menuItems = [
    {
        url: 'my-polls',
        title: 'MY POLLS',
    },
  {
    url: 'public-polls',
    title: 'PUBLIC POLLS',
  },
];

class Header extends Component {
  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
   const { user, unsetUser, setLoading } = this.props
   const { isOpen } = this.state
 
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
          <DropdownItem onClick={onLogout(unsetUser, setLoading)}>
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
};

Header.propTypes = {
  user: PropTypes.object,
};

Header.defaultProps = {
  user: null,
};


export default AppLayout(Header);
