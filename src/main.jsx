import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './Router/AppRoute';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
 <AppRouter/>
 </Provider>
  </StrictMode>
)
