import { configureStore, ThunkAction, Action, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { 
  persistStore, 
  persistReducer,  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' 
import productsReducer from './products/index'
import shoppingCartReducer from './shoppingCart/index'
import { watcherSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  basket: shoppingCartReducer,
  products: productsReducer,
});

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer, 
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(middleware)
});
export const persistor = persistStore(store)

sagaMiddleware.run(watcherSaga)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
