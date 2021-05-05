import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

//selector
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

//Styles
import {
    CartDropdownContainer,
    CartItemsContainer,
    EmptyMessageContainer,
    CartDropdownButton
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) :
                <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            }
        </CartItemsContainer>
        <CartDropdownButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }
        }>
            GO TO CHECKOUT
        </CartDropdownButton>
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

//we wrap the component returned by connect with "withRouter" to access match, history 
//and location objects that we use to navigate
export default withRouter(connect(mapStateToProps)(CartDropdown));