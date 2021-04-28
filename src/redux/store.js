import { createStore, applyMiddleware } from 'redux';
//logs the state on the console
import logger from 'redux-logger';

//persist data on the browser, (example to keep 
//track of cart items when the page refreshes or the browser is closed)
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

//creates a new persisted version of our store
export const persistor = persistStore(store);