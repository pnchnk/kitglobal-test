import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

//redux-saga
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "./sagas/rootSaga";

//redux persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localStorage from "redux-persist/lib/storage";

//reducers
import productsReducer from "./products/index";
import shoppingCartReducer from "./shoppingCart/index";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  basket: shoppingCartReducer,
  products: productsReducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});
export const persistor = persistStore(store);

sagaMiddleware.run(watcherSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
