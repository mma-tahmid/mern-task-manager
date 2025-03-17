import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import taskReducer from "../slice/taskSlice";


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
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    userslc: userReducer, //userslc comes from name (userSlice.js)
    taskslc: taskReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// export const store = configureStore({

//     reducer: {
//         userAuth: userReducer, //userAuth comes from name (userSlice.js)
//         jobslc: jobReducer
//     }

// })