import { useCallback, useRef} from "react";

export function useBackgroundMusic(src, volume = 0.2){
    const audioRef = useRef(null);
    return useCallback(()=>{
        if (audioRef.current) return;
        audioRef.current = new Audio(encondeURI(src));
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
    }, [src, volume])
}