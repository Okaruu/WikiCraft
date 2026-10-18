import { render, screen, fireEvent } from '@testing-library/react';
import Slot from '../../../components/atoms/Slot';

const pan = { valor: 'pan', nombre: 'Pan', imagen: '/imagenes/Pan.webp' };

describe('Slot (átomo)', () => {
  it('sin ítem renderiza una casilla vacía', () => {
    const { container } = render(<Slot item={undefined} onSelect={() => {}} />);
    expect(container.querySelector('.slot')).toBeTruthy();
    expect(container.querySelector('img')).toBeNull();
  });

  it('con ítem muestra su imagen con alt y title', () => {
    render(<Slot item={pan} onSelect={() => {}} />);
    const img = screen.getByRole('img', { name: 'Pan' });
    expect(img.getAttribute('src')).toBe('/imagenes/Pan.webp');
    expect(img.getAttribute('title')).toBe('Pan');
    expect(img).toHaveClass('item-icon');
  });

  it('al hacer click llama a onSelect con el ítem', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<Slot item={pan} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('img', { name: 'Pan' }));
    expect(onSelect).toHaveBeenCalledWith(pan);
  });
});
