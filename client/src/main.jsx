import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

import { Toaster } from 'react-hot-toast'

import { Provider } from 'react-redux'
import { store } from './react-redux/store/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  
  <StrictMode>


    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
        />

      </PersistGate>


    </Provider>


  </StrictMode>,
)
