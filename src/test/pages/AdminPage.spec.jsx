import { screen } from '@testing-library/react';
import AdminPage from '../../pages/AdminPage';
import { renderConProveedores } from "../utils/renderConProveedores";

describe('AdminPage', () => {
  it('renderiza el título del panel de administrador', () => {
    renderConProveedores(<AdminPage />);
    expect(screen.getByText('Panel de administrador')).toBeTruthy();
  });

  it('el título es un encabezado de nivel 2', () => {
    renderConProveedores(<AdminPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Panel de administrador'})).toBeTruthy();
  });

  it('tiene un solo un h1', () => {
    renderConProveedores(<AdminPage />);
    expect(screen.getAllByRole('heading', {level: 1}).length).toBe(1);
  });
});
