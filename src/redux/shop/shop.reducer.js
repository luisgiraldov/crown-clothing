import SHOP_DATA from './shop.data';

const INITIAL_STATE = {
    collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
    //this switch doesn't have a case because we don't modify this data
    //so it doesn't need actions
    switch (action.type) {
        default:
            return state
    }
};

export default shopReducer;