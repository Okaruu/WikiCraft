import { render, screen, fireEvent } from '@testing-library/react';
import ChestInventory from '../../../components/organisms/ChestInventory';

const items = [
  { valor: 'pan', nombre: 'Pan', imagen: '/imagenes/Pan.webp' },
  { valor: 'diamante', nombre: 'Diamante', imagen: '/imagenes/diamante.webp' },
];

describe('ChestInventory (organismo)', () => {
  it('empieza con el cofre cerrado y sin inventario', () => {
    const { container } = render(<ChestInventory items={items} onSelectItem={() => {}} />);
    expect(screen.getByRole('img', { name: 'cofre' }).getAttribute('src')).toBe('/imagenes/chest_closed.webp');
    expect(container.querySelectorAll('.slot').length).toBe(0);
  });

  it('al hacer click se abre, muestra 27 casillas y llama a onFirstOpen', () => {
    const onFirstOpen = jasmine.createSpy('onFirstOpen');
    const { container } = render(
      <ChestInventory items={items} onSelectItem={() => {}} onFirstOpen={onFirstOpen} />
    );
    fireEvent.click(screen.getByRole('img', { name: 'cofre' }));
    expect(screen.getByRole('img', { name: 'cofre' }).getAttribute('src')).toBe('/imagenes/chest_open.webp');
    expect(container.querySelectorAll('.slot').length).toBe(27);
    expect(onFirstOpen).toHaveBeenCalled();
  });

  it('muestra los ítems y al elegir uno llama a onSelectItem', () => {
    const onSelectItem = jasmine.createSpy('onSelectItem');
    render(<ChestInventory items={items} onSelectItem={onSelectItem} />);
    fireEvent.click(screen.getByRole('img', { name: 'cofre' }));
    fireEvent.click(screen.getByRole('img', { name: 'Diamante' }));
    expect(onSelectItem).toHaveBeenCalledWith(items[1]);
  });
});
