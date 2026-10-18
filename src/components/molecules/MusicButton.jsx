import { useMusic } from "../../hooks/useMusic";

export default function MusicButton({ className = "header-login btn btn-sm music-btn" }) {
    const musica = useMusic();
    if (!musica) return null;

    const { silenciada, alternar } = musica;
    const texto = silenciada ? "Activar música" : "Silenciar música";

    return (
        <button type="button" className={className} onClick={alternar} title={texto} aria-label={texto} aria-pressed={silenciada}>
            {silenciada ? "🔇" : "🔊"}
        </button>
    );
}
