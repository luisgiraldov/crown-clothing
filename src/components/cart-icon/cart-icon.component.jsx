import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

//we destructure toggleCarthidden from redux that is passed through connect
const CartIcon = ({ toggleCartHidden, itemCount  }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
    itemCount: cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
});

//we pass null as default because we don't need state values from redux, and mapDispatchToProps
//is giving us the method to modify cart state inside redux (hidden property in this case)
export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (CartIcon);