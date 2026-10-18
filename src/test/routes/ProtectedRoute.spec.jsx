import { screen } from '@testing-library/react';
import ProtectedRoute from '../../routes/ProtectedRoute';
import { renderConProveedores, USUARIO, ADMIN } from '../utils/renderConProveedores';

const rutas = [
  { path: '/', element: <p>Página de inicio</p> },
  { path: '/login', element: <p>Página de login</p> },
  { path: '/favoritos', element: <ProtectedRoute><p>Contenido privado</p></ProtectedRoute> },
  { path: '/admin', element: <ProtectedRoute role="admin"><p>Panel admin</p></ProtectedRoute> },
];

describe('ProtectedRoute', () => {
  it('sin sesión redirige a /login', () => {
    renderConProveedores(null, { ruta: '/favoritos', rutas });
    expect(screen.getByText('Página de login')).toBeTruthy();
    expect(screen.queryByText('Contenido privado')).toBeNull();
  });

  it('con sesión muestra el contenido protegido', () => {
    renderConProveedores(null, { ruta: '/favoritos', rutas, sesion: USUARIO });
    expect(screen.getByText('Contenido privado')).toBeTruthy();
  });

  it('un usuario normal no puede entrar a /admin y vuelve al inicio', () => {
    renderConProveedores(null, { ruta: '/admin', rutas, sesion: USUARIO });
    expect(screen.getByText('Página de inicio')).toBeTruthy();
    expect(screen.queryByText('Panel admin')).toBeNull();
  });

  it('el administrador sí puede entrar a /admin', () => {
    renderConProveedores(null, { ruta: '/admin', rutas, sesion: ADMIN });
    expect(screen.getByText('Panel admin')).toBeTruthy();
  });
});
