import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

//selector
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

//styles
import { 
    CartIconContainer,
    ShoppingIcon,
    ItemCountContainer
} from './cart-icon.styles';

//we destructure toggleCarthidden from redux that is passed through connect
const CartIcon = ({ toggleCartHidden, itemCount  }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIcon />
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

//we pass null as default because we don't need state values from redux, and mapDispatchToProps
//is giving us the method to modify cart state inside redux (hidden property in this case)
export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (CartIcon);