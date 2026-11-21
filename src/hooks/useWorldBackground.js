import { useEffect } from "react";

export function useWorldBackground(mundo){
    useEffect(() => {
        if(!mundo) return;
        document.body.classList.add(mundo);
        return () => document.body.classList.remove(mundo);
    }, [mundo]);
}