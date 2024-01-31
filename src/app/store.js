import { applyMiddleware, combineReducers,  legacy_createStore as createStore, compose } from "redux";
import cartReducer from "./reducer/cartReducer";
import {thunk} from "redux-thunk";
import addressReducer from "./reducer/addressReducer";
import orderReducer from "./reducer/orderReducer";

  
let rootReducer = combineReducers({
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    rootReducer,
     composeEnhancers(applyMiddleware(thunk))
);

export default store;
