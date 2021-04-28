import { combineReducers } from 'redux';
//redux-persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducers';
import directoryReducer from './directory/directory.reducer';

//this is the object that represents the possible configuration that we want 
//for redux-persist to use
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

export default persistReducer(persistConfig, rootReducer);