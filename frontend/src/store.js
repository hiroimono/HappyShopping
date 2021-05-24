/** Basic Version of State */
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'remote-redux-devtools';
// import { reducer } from './reducers/productReducer.js';

// const initialState = {
//     products: [],
//     product: {},
//     error: null,
//     loading: false
// };

/** Combined Version of State */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { combinedReducer } from './reducers/combinedReducer.js';
import { cartItemsFromLocalStorage, userLoggedInFromLocalStorage } from './localStorage.js';

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage },
    userLogin: { userInfo: userLoggedInFromLocalStorage }
};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(combinedReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;