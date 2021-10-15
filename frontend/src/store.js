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
import { localStorageData } from './localStorage.js';

const initialState = {
    cart: {
        cartItems: localStorageData.cartItemsFromLocalStorage,
        shippingAddress: localStorageData.shippingAddressFromLocalStorage
    },
    userLogin: {
        userInfo: localStorageData.userInfoFromLocalStorage
    },
    userAsGuest: {
        guestInfo: localStorageData.userAsGuestInfoFromLocalStorage
    },
};

const middleware = [thunk];
let composeEnhancers;
let store;

if (process.env.NODE_ENV === 'development') {
    composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    store = createStore(combinedReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
} else {
    store = createStore(combinedReducer, initialState, applyMiddleware(...middleware));
}

export default store;