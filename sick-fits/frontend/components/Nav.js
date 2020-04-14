import Link from 'next/link';
import { Fragment } from 'react';

import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';

const Nav = (props) => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href='/items'>
          <a>Shop</a>
        </Link>
        {me && (
          <Fragment>
            <Link href='/sell'>
              <a>Sell</a>
            </Link>
            <Link href='/orders'>
              <a>Orders</a>
            </Link>
            <Link href='/me'>
              <a>Account</a>
            </Link>
            <Link href='/signout'>
              <a>Sign Out</a>
            </Link>
          </Fragment>
        )}
        {!me && (
          <Fragment>
            <Link href='/signup'>
              <a>Sign In</a>
            </Link>
          </Fragment>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
