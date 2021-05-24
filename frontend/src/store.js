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
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { productsReducer, productReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import { userLoginReducer } from './reducers/userReducer.js';

const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userLoggedInFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    },
    userLogin: {
        userInfo: userLoggedInFromLocalStorage
    }
};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;