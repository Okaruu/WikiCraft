import { render, screen } from '@testing-library/react';
import AuthTemplate from '../../../components/templates/AuthTemplate';

describe('AuthTemplate (template)', () => {
  it('renderiza un <main> con la clase auth-template', () => {
    render(<AuthTemplate><p>contenido</p></AuthTemplate>);
    expect(screen.getByRole('main')).toHaveClass('auth-template');
  });

  it('muestra el contenido que recibe como children', () => {
    render(<AuthTemplate><h2>Iniciar sesión</h2></AuthTemplate>);
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy();
  });

  it('el contenido queda dentro del <main>', () => {
    render(<AuthTemplate><form aria-label="formulario" /></AuthTemplate>);
    expect(screen.getByRole('main').contains(screen.getByRole('form', { name: 'formulario' }))).toBeTrue();
  });
});
