import { render, screen } from '@testing-library/react';
import AdminPage from '../../pages/AdminPage';

describe('AdminPage', () => {
  it('renderiza el título del panel de administrador', () => {
    render(<AdminPage />);
    expect(screen.getByText('Panel de administrador')).toBeTruthy();
  });

  it('el título es un encabezado de nivel 1', () => {
    render(<AdminPage />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Panel de administrador');
  });

  it('tiene un solo encabezado', () => {
    render(<AdminPage />);
    expect(screen.getAllByRole('heading').length).toBe(1);
  });
});
