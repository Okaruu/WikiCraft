import { screen } from '@testing-library/react';
import MainLayout from '../../../components/templates/MainLayout';
import { renderConProveedores } from '../../utils/renderConProveedores';

describe('MainLayout (template)', () => {
  it('incluye el Header con el título WikiCraft', () => {
    renderConProveedores(<MainLayout><p>hola</p></MainLayout>);
    expect(screen.getByRole('heading', { level: 1, name: 'WikiCraft' })).toBeTruthy();
  });

  it('muestra el contenido dentro de la sección #content', () => {
    const { container } = renderConProveedores(<MainLayout><p>contenido de prueba</p></MainLayout>);
    const seccion = container.querySelector('#content');
    expect(seccion.contains(screen.getByText('contenido de prueba'))).toBeTrue();
  });

  it('incluye el Footer y el creeper', () => {
    const { container } = renderConProveedores(<MainLayout><p>hola</p></MainLayout>);
    expect(container.querySelector('footer#footer')).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Creeper' })).toBeTruthy();
  });

  it('el contenido usa el contenedor responsivo de Bootstrap', () => {
    const { container } = renderConProveedores(<MainLayout><p>hola</p></MainLayout>);
    expect(container.querySelector('#content')).toHaveClass('container-lg');
    expect(container.querySelector('.layout')).toHaveClass('min-vh-100');
  });
});
