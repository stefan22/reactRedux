import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>

    <h1>Expenses Report</h1>
    <h3>Create, add, edit and delete your job expenses</h3>
    <hr />

    <nav>
      <NavLink to="/" activeClassName="is-active" exact={true}>
         Dashboard
      </NavLink>
      <NavLink to="/create" activeClassName="is-active">
         Create Expense
      </NavLink>
      <NavLink to="/help" activeClassName="is-active">
         Help
      </NavLink>
   </nav>

  </header>
);

export default Header;
