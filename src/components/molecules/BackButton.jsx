import Button from "../atoms/Button";

export default function BackButton({ onClick }) {
    return (
        <Button className="login-back" onClick={onClick} aria-label="Volver">
            ←
        </Button>
    );
}