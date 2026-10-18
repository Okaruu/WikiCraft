import { screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../../pages/RegisterPage';
import { renderConProveedores } from '../utils/renderConProveedores';

const rutas = [
  { path: '/', element: <p>Inicio de prueba</p> },
  { path: '/registro', element: <RegisterPage /> },
];

function registrar(correo, clave) {
  fireEvent.change(screen.getByLabelText('Correo'), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } });
  fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: clave } });
  fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
}

describe('RegisterPage', () => {
  it('registra la cuenta en localStorage, inicia sesión y vuelve al inicio', () => {
    renderConProveedores(null, { ruta: '/registro', rutas });
    registrar('Nueva@Gmail.com', 'Wiki2026!');
    expect(screen.getByText('Inicio de prueba')).toBeTruthy();
    const cuentas = JSON.parse(localStorage.getItem('wikicraft:cuentas'));
    expect(cuentas).toEqual([{ email: 'nueva@gmail.com', password: 'Wiki2026!' }]);
    expect(JSON.parse(localStorage.getItem('wikicraft:sesion')).role).toBe('user');
  });

  it('no permite registrar dos veces el mismo correo', () => {
    localStorage.setItem('wikicraft:cuentas', JSON.stringify([
      { email: 'carlos@gmail.com', password: 'Wiki2026!' },
    ]));
    renderConProveedores(null, { ruta: '/registro', rutas });
    registrar('carlos@gmail.com', 'Wiki2026!');
    expect(screen.getByText('Ya existe una cuenta con ese correo.')).toBeTruthy();
    expect(screen.queryByText('Inicio de prueba')).toBeNull();
  });

  it('la flecha de volver lleva al inicio', () => {
    renderConProveedores(null, { ruta: '/registro', rutas });
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));
    expect(screen.getByText('Inicio de prueba')).toBeTruthy();
  });
});
