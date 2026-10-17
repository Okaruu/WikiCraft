import { useContext } from "react";
import { ItemsContext } from "../context/itemsContext";

export function useItemEdits() {
    return useContext(ItemsContext);
}