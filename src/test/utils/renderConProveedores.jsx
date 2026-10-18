import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthProvider';
import { ItemsProvider } from '../../context/ItemsProvider';
import { FavoritesProvider } from '../../context/FavoritesProvider';

export const USUARIO = { email: 'carlos@gmail.com', role: 'user' };
export const ADMIN = { email: 'admin@wikicraft.wk.com', role: 'admin' };

/**
 * @param ui    
 * @param opciones.sesion     
 * @param opciones.ruta       
 * @param opciones.rutas      
 */

export function renderConProveedores(ui, { sesion = null, ruta = '/', rutas = null } = {}) {
  if (sesion) localStorage.setItem('wikicraft:sesion', JSON.stringify(sesion));

  const contenido = rutas ? (
    <Routes>
      {rutas.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
  ) : (
    ui
  );

  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <ItemsProvider>
          <FavoritesProvider>{contenido}</FavoritesProvider>
        </ItemsProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}
