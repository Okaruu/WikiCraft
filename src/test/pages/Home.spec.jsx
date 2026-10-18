import { Profiler } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home';
import { renderConProveedores } from '../utils/renderConProveedores';

describe('Home Page', () => {
  beforeEach(() => {
    spyOn(HTMLMediaElement.prototype, 'play').and.returnValue(Promise.resolve());
    spyOn(window, 'alert');
  });

  it('renderiza el resumen de la página', () => {
    renderConProveedores(<Home />);
    expect(screen.getByRole('heading', { name: 'Resumen de la página' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeTruthy();
  });

  it('al elegir el mundo Nether cambia el fondo y las estructuras disponibles', () => {
    renderConProveedores(<Home />);
    fireEvent.change(screen.getByLabelText('Mundo'), { target: { value: 'nether' } });
    expect(document.body).toHaveClass('nether');
    expect(screen.getByRole('option', { name: 'Fortaleza del Nether' })).toBeTruthy();
  });

  it('buscar "Aldea", abrir el cofre y elegir un ítem muestra su panel', () => {
    renderConProveedores(<Home />);
    fireEvent.change(screen.getByPlaceholderText('Ej: Aldea'), { target: { value: 'Aldea' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(screen.getByLabelText('Mundo').value).toBe('overworld');

    fireEvent.click(screen.getByRole('img', { name: 'cofre' }));
    fireEvent.click(screen.getByRole('img', { name: 'Pan' }));
    expect(screen.getByText(/Probabilidad de aparición: 60%/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'X' })).toBeTruthy();
  });

  it('mide el tiempo de renderizado de la página de inicio', () => {
    const onRender = jasmine.createSpy('onRender');
    renderConProveedores(
      <Profiler id="Home" onRender={onRender}>
        <Home />
      </Profiler>
    );
    expect(onRender).toHaveBeenCalled();
    const duracion = onRender.calls.mostRecent().args[2];
    console.log('Tiempo de renderizado de Home:', duracion, 'ms');
    expect(duracion).toBeLessThan(200);
  });

  it('usa la grilla de Bootstrap para ordenar el cofre y el panel (diseño responsivo)', () => {
    const { container } = renderConProveedores(<Home />);
    const fila = container.querySelector('.chest-and-panel');
    expect(fila).toHaveClass('row');
    const columnas = fila.querySelectorAll(':scope > div');
    expect(columnas.length).toBe(2);
    columnas.forEach((col) => {
      expect(col).toHaveClass('col-12'); 
      expect(col).toHaveClass('col-lg-auto');
    });
  });
});
