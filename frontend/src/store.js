import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productreducer,productDetailsreducer } from "./reducers/productreducer";

const reducer = combineReducers({
  product: productreducer,
  productDetails:productDetailsreducer
});
let initialState = {}; // Corrected the typo in variable name
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
