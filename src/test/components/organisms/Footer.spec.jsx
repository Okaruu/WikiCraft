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
});
