import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/atoms/Button';

describe('Button Component', () => {
    it('renderiza el botón con su contenido', () => {
        render(<Button>Haz click</Button>);
        const button = screen.getByRole('button', { name: 'Haz click' });
        expect(button).toBeTruthy();
    });

    it('aplica los props recibidos al botón', () => {
        render(
            <Button className="btn btn-primary" type="submit" disabled>
                Enviar
            </Button>
        );
        
        const button = screen.getByRole('button', { name: 'Enviar' });
        expect(button).toHaveClass('btn-primary');
        expect(button.getAttribute('type')).toBe('submit');
        expect(button.disabled).toBeTrue();
    });

    it('ejecuta onClick al hacer click', () => {
        const onClick = jasmine.createSpy('onClick');
        render(<Button onClick={onClick}>Haz click</Button>);
        fireEvent.click(screen.getByRole('button', { name: 'Haz click' }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});