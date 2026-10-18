import { screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../../components/organisms/RegisterForm';
import { renderConProveedores } from '../../utils/renderConProveedores';

function registrar({ correo, clave, repetir }) {
  fireEvent.change(screen.getByLabelText('Correo'), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } });
  fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: repetir } });
  fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
}

describe('RegisterForm (organismo)', () => {
  it('muestra error si las contraseñas no coinciden', () => {
    renderConProveedores(<RegisterForm onSubmit={() => ''} />);
    registrar({ correo: 'carlos@gmail.com', clave: 'Wiki2026!', repetir: 'Wiki2026?' });
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeTruthy();
  });

  it('no permite registrar correos del dominio de administrador', () => {
    renderConProveedores(<RegisterForm onSubmit={() => ''} />);
    registrar({ correo: 'pepe@wikicraft.wk.com', clave: 'Wiki2026!', repetir: 'Wiki2026!' });
    expect(screen.getByText(/solo para administradores/)).toBeTruthy();
  });

  it('valida que la contraseña tenga al menos 8 caracteres', () => {
    renderConProveedores(<RegisterForm onSubmit={() => ''} />);
    registrar({ correo: 'carlos@gmail.com', clave: 'Ab1!', repetir: 'Ab1!' });
    expect(screen.getByText(/al menos 8/)).toBeTruthy();
  });

  it('con datos válidos llama a onSubmit con correo y contraseña', () => {
    const onSubmit = jasmine.createSpy('onSubmit').and.returnValue('');
    renderConProveedores(<RegisterForm onSubmit={onSubmit} />);
    registrar({ correo: 'carlos@gmail.com', clave: 'Wiki2026!', repetir: 'Wiki2026!' });
    expect(onSubmit).toHaveBeenCalledWith({ email: 'carlos@gmail.com', password: 'Wiki2026!' });
  });
});
