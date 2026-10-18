import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutocompleteInput from '../../../components/molecules/AutocompleteInput';

function Envoltura({ onPick }) {
  const [valor, setValor] = useState('');
  return <AutocompleteInput value={valor} onChange={setValor} onPick={onPick} />;
}

function escribir(texto) {
  const input = screen.getByPlaceholderText('Ej: Aldea');
  fireEvent.change(input, { target: { value: texto } });
  return input;
}

describe('AutocompleteInput (molécula)', () => {
  it('muestra sugerencias que coinciden con lo escrito', async () => {
    render(<Envoltura onPick={() => {}} />);
    escribir('ald');
    expect(await screen.findByText('Aldea')).toBeTruthy();
  });

  it('al elegir una sugerencia con el mouse llama a onPick con la estructura', async () => {
    const onPick = jasmine.createSpy('onPick');
    render(<Envoltura onPick={onPick} />);
    escribir('ald');
    fireEvent.mouseDown(await screen.findByText('Aldea'));
    expect(onPick).toHaveBeenCalledWith(jasmine.objectContaining({ valor: 'aldea' }));
  });

  it('permite elegir con flecha abajo + Enter', async () => {
    const onPick = jasmine.createSpy('onPick');
    render(<Envoltura onPick={onPick} />);
    const input = escribir('ald');
    await screen.findByText('Aldea');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onPick).toHaveBeenCalledWith(jasmine.objectContaining({ valor: 'aldea' }));
  });

  it('Escape cierra la lista de sugerencias', async () => {
    render(<Envoltura onPick={() => {}} />);
    const input = escribir('ald');
    await screen.findByText('Aldea');
    fireEvent.keyDown(input, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByText('Aldea')).toBeNull());
  });
});
