import Link from 'next/link';
import { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';

import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import CartCount from './CartCount';

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
            <SignOut />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  my cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0,
                    )}
                  ></CartCount>
                </button>
              )}
            </Mutation>
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
