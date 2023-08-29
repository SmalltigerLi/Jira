import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
    const [state, setState] = useState<{
        past: T[];
        present: T;
        future: T[];
    }>({
        past: [],
        present: initialPresent,
        future: [],
    });
    const canUndo = state.past.length != 0;
    const canRedo = state.future.length != 0;

    const undo = useCallback(() => {
        setState((prev) => {
            const { past, present, future } = prev;
            if(past.length === 0) return prev;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        });
    }, []);
    const redo = useCallback(() => {
        setState((prev) => {
            const { past, present, future } = prev;
            if(future.length === 0) return prev;
            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        });
    },[])

    const set = useCallback((newPresent: T) => {
        setState(prev => {
            const { past, present, future } = prev;
            if (newPresent === present) {
                return prev;
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })
        
    }, [])

    const reset = useCallback((newPresent: T) => {
        setState({
            past: [],
            present: newPresent,
            future: []
        })
    }, [])
    return [
        state,
        { undo, redo, set, reset, canUndo, canRedo },
    ];
};
