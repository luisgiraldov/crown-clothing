// Utility functions allow us to 
//keep our files clean and organize 
//functions that we may need in multiple files in one location

//we receive the current cart state and the item to add
export const addItemToCart = (cartItems, cartItemToAdd) => {
    //checks if the item to add has been added before
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    //if the item we just added exists in state, we just increment its quantity by one
    // so we don't add duplicates to the cart
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    //quantity property gets attached the first time around since this if block won't run when it's a new item
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};