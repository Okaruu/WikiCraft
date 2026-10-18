import { screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../../components/organisms/LoginForm';
import { renderConProveedores } from '../../utils/renderConProveedores';

function llenar({ correo = '', clave = '', codigo } = {}) {
  fireEvent.change(screen.getByLabelText(/Correo/), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } });
  if (codigo !== undefined) {
    fireEvent.change(screen.getByLabelText('Código de acceso'), { target: { value: codigo } });
  }
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
}

describe('LoginForm (organismo)', () => {
  it('muestra error si el correo tiene dos puntos seguidos', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    renderConProveedores(<LoginForm onSubmit={onSubmit} />);
    llenar({ correo: 'carlos..m@gmail.com', clave: '1234' });
    expect(screen.getByText('El correo no puede tener dos puntos seguidos.')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('con datos válidos llama a onSubmit con el correo en minúsculas y rol user', () => {
    const onSubmit = jasmine.createSpy('onSubmit').and.returnValue('');
    renderConProveedores(<LoginForm onSubmit={onSubmit} />);
    llenar({ correo: 'Carlos@Gmail.com', clave: 'mi-clave' });
    expect(onSubmit).toHaveBeenCalledWith({ email: 'carlos@gmail.com', password: 'mi-clave', role: 'user' });
  });

  it('muestra el error que devuelve onSubmit (ej: contraseña incorrecta)', () => {
    const onSubmit = jasmine.createSpy('onSubmit').and.returnValue('Contraseña incorrecta.');
    renderConProveedores(<LoginForm onSubmit={onSubmit} />);
    llenar({ correo: 'carlos@gmail.com', clave: 'mala' });
    expect(screen.getByText('Contraseña incorrecta.')).toBeTruthy();
  });

  it('el modo administrador muestra el campo de código y valida el código', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    renderConProveedores(<LoginForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar como administrador' }));
    expect(screen.getByRole('heading', { name: 'Acceso administrador' })).toBeTruthy();
    llenar({ correo: 'admin@wikicraft.wk.com', clave: 'Wiki2026!', codigo: 'MALO' });
    expect(screen.getByText('Código de acceso incorrecto')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('la flecha de volver llama a onBack', () => {
    const onBack = jasmine.createSpy('onBack');
    renderConProveedores(<LoginForm onSubmit={() => ''} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));
    expect(onBack).toHaveBeenCalled();
  });
});
