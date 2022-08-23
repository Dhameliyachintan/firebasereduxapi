import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './Reducer/Index'
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter'] 
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const ConfigurStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)

    return {store, persistor }
}
