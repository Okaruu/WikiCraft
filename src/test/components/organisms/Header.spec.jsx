import { screen, fireEvent } from '@testing-library/react';
import Header from '../../../components/organisms/Header';
import { renderConProveedores, USUARIO } from '../../utils/renderConProveedores';

describe('Header (organismo)', () => {
  it('muestra el título WikiCraft enlazado al inicio', () => {
    renderConProveedores(<Header />);
    const titulo = screen.getByRole('heading', { level: 1, name: 'WikiCraft' });
    expect(titulo.closest('a').getAttribute('href')).toBe('/');
  });

  it('sin sesión muestra los enlaces de iniciar sesión y registro', () => {
    renderConProveedores(<Header />);
    expect(screen.getByRole('link', { name: 'Iniciar sesión' }).getAttribute('href')).toBe('/login');
    expect(screen.getByRole('link', { name: /Regist/ }).getAttribute('href')).toBe('/registro');
    expect(screen.queryByText('Cerrar sesión')).toBeNull();
  });

  it('con sesión muestra Favoritos y Cerrar sesión', () => {
    renderConProveedores(<Header />, { sesion: USUARIO });
    expect(screen.getByRole('link', { name: 'Favoritos' }).getAttribute('href')).toBe('/favoritos');
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeTruthy();
    expect(screen.queryByText('Iniciar sesión')).toBeNull();
  });

  it('al cerrar sesión se borra la sesión y vuelve a aparecer "Iniciar sesión"', () => {
    renderConProveedores(<Header />, { sesion: USUARIO });
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(localStorage.getItem('wikicraft:sesion')).toBeNull();
  });

  it('muestra el botón de música en el header, con o sin sesión', () => {
    const { unmount } = renderConProveedores(<Header />);
    expect(screen.getByRole('button', { name: 'Silenciar música' })).toBeTruthy();
    unmount();
    renderConProveedores(<Header />, { sesion: USUARIO });
    expect(screen.getByRole('button', { name: 'Silenciar música' })).toBeTruthy();
  });
});
