import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import { productReducer } from './reducers/productReducer.js';


const reducer = combineReducers({
    products: productReducer
});

const initialState = {};
const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;