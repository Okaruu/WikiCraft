import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer (organismo)', () => {
  it('renderiza un <footer> con id "footer"', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer#footer')).toBeTruthy();
  });

  it('muestra el texto de derechos reservados', () => {
    render(<Footer />);
    expect(screen.getByText(/Todos los derechos reservados por WikiCraft/)).toBeTruthy();
  });

  it('incluye la sección de contacto', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeTruthy();
  });

  it('usa columnas de Bootstrap: apiladas en móvil y en 3 columnas desde md', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toHaveClass('row');
    const columnas = container.querySelectorAll('.footer-col');
    expect(columnas.length).toBe(3);
    columnas.forEach((col) => expect(col).toHaveClass('col-md-4'));
  });
});
