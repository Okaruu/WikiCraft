import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from '../../../components/molecules/FavoriteButton';

describe('FavoriteButton (molécula)', () => {
  it('inactivo: muestra el corazón vacío y "Añadir a favoritos"', () => {
    const { container } = render(<FavoriteButton active={false} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Añadir a favoritos' })).toBeTruthy();
    expect(container.querySelector('img').getAttribute('src')).toBe('/imagenes/empty-heart.webp');
  });

  it('activo: muestra el corazón lleno y "Quitar de favoritos"', () => {
    const { container } = render(<FavoriteButton active onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Quitar de favoritos' })).toBeTruthy();
    expect(container.querySelector('img').getAttribute('src')).toBe('/imagenes/full-heart.webp');
  });

  it('usa la clase fav-btn por defecto y llama a onClick', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<FavoriteButton active={false} onClick={onClick} />);
    const boton = screen.getByRole('button');
    expect(boton).toHaveClass('fav-btn');
    fireEvent.click(boton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
