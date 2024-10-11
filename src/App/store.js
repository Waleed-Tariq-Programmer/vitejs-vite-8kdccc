import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Feature/authSlice";
import postReducer from "../Feature/postSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage, 
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persist the store
const persistor = persistStore(store);

export { store, persistor };
