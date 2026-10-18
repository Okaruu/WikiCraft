import { useCallback, useEffect, useRef, useState } from "react";
import { MusicContext } from "./musicContext";

const KEY = "wikicraft:musica-silenciada";

function leerSilenciada() {
    try { return localStorage.getItem(KEY) === "true"; } catch { return false; }
}

export function MusicProvider({ src = "/audios/C418 - Sweden.mp3", volume = 0.2, children }) {
    const audioRef = useRef(null);
    const [silenciada, setSilenciada] = useState(leerSilenciada);

    const obtenerAudio = useCallback(() => {
        if (!audioRef.current) {
            const audio = new Audio(encodeURI(src));
            audio.loop = true;
            audio.volume = volume;
            audioRef.current = audio;
        }
        return audioRef.current;
    }, [src, volume]);

    const iniciar = useCallback(() => {
        if (silenciada) return;
        obtenerAudio().play().catch(() => {});
    }, [silenciada, obtenerAudio]);

    const alternar = () => {
        const nueva = !silenciada;
        setSilenciada(nueva);
        try { localStorage.setItem(KEY, String(nueva)); } catch { }
        if (nueva) audioRef.current?.pause();
        else obtenerAudio().play().catch(() => {});
    };

    useEffect(() => () => audioRef.current?.pause(), []);

    return (
        <MusicContext.Provider value={{ silenciada, iniciar, alternar }}>
            {children}
        </MusicContext.Provider>
    );
}
