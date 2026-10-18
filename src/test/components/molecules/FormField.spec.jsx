import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/molecules/FormField';

describe('FormField (molécula)', () => {
  it('renderiza la etiqueta asociada al input', () => {
    render(<FormField id="email" label="Correo" />);
    expect(screen.getByLabelText('Correo').id).toBe('email');
  });

  it('pasa las demás props al input (type y placeholder)', () => {
    render(<FormField id="password" label="Contraseña" type="password" placeholder="******" />);
    const input = screen.getByLabelText('Contraseña');
    expect(input.getAttribute('type')).toBe('password');
    expect(input.getAttribute('placeholder')).toBe('******');
  });

  it('llama a onChange al escribir en el campo', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<FormField id="code" label="Código" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'WIKI' } });
    expect(onChange).toHaveBeenCalled();
  });
});
