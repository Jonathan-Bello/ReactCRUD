import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './styles/styles.scss'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
