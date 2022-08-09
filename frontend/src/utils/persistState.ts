import { useState } from "react";

export const usePersistState = <T>(
    key: string,
    initialValue: T,
): [T, (value: T) => void] => {
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key);
        if (storageValue) {
            return JSON.parse(storageValue);
        } else {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [state, setValue];
};
