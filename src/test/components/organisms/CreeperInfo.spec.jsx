import { render, screen, fireEvent } from '@testing-library/react';
import CreeperInfo from '../../../components/organisms/CreeperInfo';

describe('CreeperInfo (organismo)', () => {
  it('renderiza el logo del creeper', () => {
    render(<CreeperInfo />);
    expect(screen.getByRole('img', { name: 'Creeper' }).getAttribute('src')).toBe('/imagenes/logo-creeper.webp');
  });

  it('el texto empieza oculto y se muestra al hacer click en el creeper', () => {
    const { container } = render(<CreeperInfo />);
    const texto = container.querySelector('.creeper-text');
    expect(texto).not.toHaveClass('visible');
    fireEvent.click(screen.getByRole('img', { name: 'Creeper' }));
    expect(texto).toHaveClass('visible');
  });

  it('incluye el enlace al sitio oficial de Minecraft', () => {
    render(<CreeperInfo />);
    expect(screen.getByRole('link', { name: 'Sitio oficial de Minecraft' }).getAttribute('href'))
      .toBe('https://www.minecraft.net/es-es');
  });
});
