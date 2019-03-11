import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const inititalState = {};

const store = createStore(
  rootReducer,
  inititalState,
  compose(
    applyMiddleware(thunk),
    window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : f => f
  )
);

export default store;
