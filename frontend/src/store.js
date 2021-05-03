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

/** First Version of State */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { productsReducer, productReducer } from './reducers/productReducer.js';

const reducer = combineReducers({
    productsReducer,
    productReducer
});

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;