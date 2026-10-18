import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { FavoritesProvider } from './context/FavoritesProvider.jsx';
import { ItemsProvider } from './context/ItemsProvider.jsx';
import { MusicProvider } from './context/MusicProvider.jsx';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MusicProvider>
        <AuthProvider>
          <ItemsProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </ItemsProvider>
        </AuthProvider>
      </MusicProvider>
    </BrowserRouter>
  </StrictMode>
)
