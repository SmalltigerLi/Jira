import { useEffect, useState } from "react";

const isVoid = (obj: unknown) => obj === undefined || obj === null || obj === '';

export const cleanObject = (object: {[key: string]: unknown}) => {
    const reslut = {...object};
    Object.keys(reslut).forEach(key => {
        if(isVoid(reslut[key])) {
            delete reslut[key]
        }
    })
    return reslut;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}

export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);
    return debouncedValue;
}