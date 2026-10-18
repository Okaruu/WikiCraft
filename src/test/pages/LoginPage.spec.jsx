import { screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import { renderConProveedores } from '../utils/renderConProveedores';

const rutas = [
  { path: '/', element: <p>Inicio de prueba</p> },
  { path: '/login', element: <LoginPage /> },
];

function iniciarSesion(correo, clave) {
  fireEvent.change(screen.getByLabelText(/Correo/), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } });
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.setItem('wikicraft:cuentas', JSON.stringify([
      { email: 'carlos@gmail.com', password: 'Wiki2026!' },
    ]));
  });

  it('con una cuenta registrada inicia sesión y vuelve al inicio', () => {
    renderConProveedores(null, { ruta: '/login', rutas });
    iniciarSesion('carlos@gmail.com', 'Wiki2026!');
    expect(screen.getByText('Inicio de prueba')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('wikicraft:sesion'))).toEqual({ email: 'carlos@gmail.com', role: 'user' });
  });

  it('con un correo no registrado muestra error y no inicia sesión', () => {
    renderConProveedores(null, { ruta: '/login', rutas });
    iniciarSesion('nadie@gmail.com', 'Wiki2026!');
    expect(screen.getByText(/No existe una cuenta con ese correo/)).toBeTruthy();
    expect(localStorage.getItem('wikicraft:sesion')).toBeNull();
  });

  it('con contraseña incorrecta muestra "Contraseña incorrecta."', () => {
    renderConProveedores(null, { ruta: '/login', rutas });
    iniciarSesion('carlos@gmail.com', 'otra-clave');
    expect(screen.getByText('Contraseña incorrecta.')).toBeTruthy();
  });

  it('la flecha de volver lleva al inicio', () => {
    renderConProveedores(null, { ruta: '/login', rutas });
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));
    expect(screen.getByText('Inicio de prueba')).toBeTruthy();
  });
});
