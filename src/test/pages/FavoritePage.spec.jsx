import { screen, fireEvent } from '@testing-library/react';
import FavoritesPage from '../../pages/FavoritePage';
import { renderConProveedores, USUARIO } from '../utils/renderConProveedores';

const CLAVE = 'wikicraft:favoritos:carlos@gmail.com';
const pan = { valor: 'pan', nombre: 'Pan', imagen: '/imagenes/Pan.webp' };

describe('FavoritesPage', () => {
  it('renderiza el título "Mis favoritos"', () => {
    renderConProveedores(<FavoritesPage />, { sesion: USUARIO });
    expect(screen.getByRole('heading', { name: 'Mis favoritos' })).toBeTruthy();
  });

  it('sin favoritos muestra el mensaje de lista vacía', () => {
    renderConProveedores(<FavoritesPage />, { sesion: USUARIO });
    expect(screen.getByText(/Aún no tienes ítems favoritos/)).toBeTruthy();
  });

  it('muestra los favoritos guardados del usuario', () => {
    localStorage.setItem(CLAVE, JSON.stringify([pan]));
    renderConProveedores(<FavoritesPage />, { sesion: USUARIO });
    expect(screen.getByText('Pan')).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Pan' }).getAttribute('src')).toBe('/imagenes/Pan.webp');
  });

  it('al tocar el corazón se quita el favorito', () => {
    localStorage.setItem(CLAVE, JSON.stringify([pan]));
    renderConProveedores(<FavoritesPage />, { sesion: USUARIO });
    fireEvent.click(screen.getByRole('button', { name: 'Quitar de favoritos' }));
    expect(screen.queryByText('Pan')).toBeNull();
    expect(JSON.parse(localStorage.getItem(CLAVE))).toEqual([]);
  });
});
