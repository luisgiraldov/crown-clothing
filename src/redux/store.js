import { createStore, applyMiddleware } from 'redux';
//logs the state on the console
import logger from 'redux-logger';

//persist data on the browser, (example to keep 
//track of cart items when the page refreshes or the browser is closed)
import { persistStore } from 'redux-persist';

//Allow asynchronous functions with redux
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

//we add the middlewares we need into this arry to later pass them to the createStore function
const middlewares = [logger, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

//creates a new persisted version of our store
export const persistor = persistStore(store);