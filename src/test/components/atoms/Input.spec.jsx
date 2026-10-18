import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input (átomo)', () => {
  it('renderiza un input con su placeholder', () => {
    render(<Input placeholder="Ej: Aldea" />);
    expect(screen.getByPlaceholderText('Ej: Aldea')).toBeTruthy();
  });

  it('pasa las props al <input> (type, id y maxLength)', () => {
    render(<Input id="correo" type="email" maxLength={30} placeholder="correo" />);
    const input = screen.getByPlaceholderText('correo');
    expect(input.getAttribute('type')).toBe('email');
    expect(input.id).toBe('correo');
    expect(input.maxLength).toBe(30);
  });

  it('llama a onChange al escribir', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<Input placeholder="texto" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('texto'), { target: { value: 'iglu' } });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.calls.mostRecent().args[0].target.value).toBe('iglu');
  });
});
