import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'

export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link className="navbar-brand" to="/">Vidly</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/movies">Movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/customers">Customers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}