import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { FavoritesProvider } from './context/FavoritesProvider.jsx';
import { ItemsProvider } from './context/ItemsProvider.jsx';
import App from './App.jsx'
import "bulma/css/bulma.min.css"
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemsProvider>
          <FavoritesProvider>
            < App />
          </FavoritesProvider>
        </ItemsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
