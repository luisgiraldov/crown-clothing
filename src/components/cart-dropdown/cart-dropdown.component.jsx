import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

//selector
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={CartItem.id} item={cartItem} />
                    ))
                ) :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => history.push('/checkout')}>
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

//we wrap the component returned by connect with "withRouter" to access match, history 
//and location objects that we use to navigate
export default withRouter(connect(mapStateToProps)(CartDropdown));