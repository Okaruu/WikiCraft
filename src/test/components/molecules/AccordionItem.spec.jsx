import { render, screen, fireEvent } from '@testing-library/react';
import AccordionItem from '../../../components/molecules/AccordionItem';

function renderAccordion() {
  render(
    <AccordionItem titulo="Información">
      <p>Texto del ítem</p>
    </AccordionItem>
  );
  const boton = screen.getByRole('button', { name: /Información/ });
  const contenido = screen.getByText('Texto del ítem').parentElement;
  return { boton, contenido };
}

describe('AccordionItem (molécula)', () => {
  it('renderiza el título y empieza cerrado (altura 0)', () => {
    const { boton, contenido } = renderAccordion();
    expect(boton).toBeTruthy();
    expect(boton).not.toHaveClass('active');
    expect(parseInt(contenido.style.maxHeight, 10)).toBe(0);
  });

  it('al hacer click se abre: clase active y altura mayor a 0', () => {
    const { boton, contenido } = renderAccordion();
    fireEvent.click(boton);
    expect(boton).toHaveClass('active');
    expect(parseInt(contenido.style.maxHeight, 10)).toBeGreaterThan(0);
  });

  it('un segundo click lo vuelve a cerrar', () => {
    const { boton, contenido } = renderAccordion();
    fireEvent.click(boton);
    fireEvent.click(boton);
    expect(boton).not.toHaveClass('active');
    expect(parseInt(contenido.style.maxHeight, 10)).toBe(0);
  });
});
