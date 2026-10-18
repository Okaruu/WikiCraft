import { useContext } from "react";
import { MusicContext } from "../context/musicContext";

export function useMusic() {
    return useContext(MusicContext);
}
