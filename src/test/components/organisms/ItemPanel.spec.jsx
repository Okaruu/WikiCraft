import { screen, fireEvent } from '@testing-library/react';
import ItemPanel from '../../../components/organisms/ItemPanel';
import { renderConProveedores, USUARIO, ADMIN } from '../../utils/renderConProveedores';

const pan = {
  valor: 'pan',
  nombre: 'Pan',
  imagen: '/imagenes/Pan.webp',
  informacion: 'Se obtiene con 3 de trigo.',
  atributos: 'Llena 1.25 puntos de hambre.',
  probabilidad: '60%',
};

describe('ItemPanel (organismo)', () => {
  it('no renderiza nada si no hay ítem seleccionado', () => {
    const { container } = renderConProveedores(<ItemPanel item={null} onClose={() => {}} />);
    expect(container.querySelector('.item-panel')).toBeNull();
  });

  it('muestra el nombre, la información y la probabilidad del ítem', () => {
    renderConProveedores(<ItemPanel item={pan} onClose={() => {}} />);
    expect(screen.getByText('Pan')).toBeTruthy();
    expect(screen.getByText('Se obtiene con 3 de trigo.')).toBeTruthy();
    expect(screen.getByText('Probabilidad de aparición: 60%')).toBeTruthy();
  });

  it('la X llama a onClose', () => {
    const onClose = jasmine.createSpy('onClose');
    renderConProveedores(<ItemPanel item={pan} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('sin sesión, el corazón muestra el aviso para iniciar sesión', () => {
    renderConProveedores(<ItemPanel item={pan} onClose={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Añadir a favoritos' }));
    expect(screen.getByText(/Inicia sesión para guardar favoritos/)).toBeTruthy();
    expect(localStorage.getItem('wikicraft:favoritos:carlos@gmail.com')).toBeNull();
  });

  it('con sesión, el corazón agrega el ítem a favoritos', () => {
    renderConProveedores(<ItemPanel item={pan} onClose={() => {}} />, { sesion: USUARIO });
    fireEvent.click(screen.getByRole('button', { name: 'Añadir a favoritos' }));
    expect(screen.getByRole('button', { name: 'Quitar de favoritos' })).toBeTruthy();
    const guardados = JSON.parse(localStorage.getItem('wikicraft:favoritos:carlos@gmail.com'));
    expect(guardados[0].valor).toBe('pan');
  });

  it('el administrador puede editar y guardar la información del ítem', () => {
    renderConProveedores(<ItemPanel item={pan} onClose={() => {}} />, { sesion: ADMIN });
    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.change(screen.getByLabelText('Información'), { target: { value: 'Texto editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    const ediciones = JSON.parse(localStorage.getItem('wikicraft:items-editados'));
    expect(ediciones.pan.informacion).toBe('Texto editado');
  });

  it('un usuario normal no ve el botón Editar', () => {
    renderConProveedores(<ItemPanel item={pan} onClose={() => {}} />, { sesion: USUARIO });
    expect(screen.queryByRole('button', { name: 'Editar' })).toBeNull();
  });
});
