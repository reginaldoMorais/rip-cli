import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* Middlewares */
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

/* Reducers */
import reducers from './Reducers';

export const createServerStore = (initialState = {}) => {
  const middlewares = compose(applyMiddleware(multi, thunk, promise));
  return createStore(reducers, initialState, middlewares);
};

export const createClientStore = (initialState, devTools) => {
  const persistConfig = { key: 'root', storage };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const middlewares = compose(
    applyMiddleware(multi, thunk, promise),
    devTools
  );

  const store = createStore(persistedReducer, initialState, middlewares);
  const persistor = persistStore(store);
  persistor.purge();

  return { store, persistor };
};

export default { createServerStore, createClientStore };
