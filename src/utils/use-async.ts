
import { useState } from "react";
import { useMountRef } from ".";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, initialConfig};
    const mountedRef = useMountRef();
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data: D) => {
        setState({
            data,
            stat: 'success',
            error: null
        })
    }
    const setError = (error: Error) => {
        setState({
            data: null,
            stat: 'error',
            error: error
        })
    }
    //触发异步请求
    const run = async (promise: Promise<D>) => {
        if(!promise || !promise.then) {
            throw new Error('请传入Promise类型数据');
        }
        setState({...state, stat: 'loading'});
        try {
            const data = await promise;
            if(mountedRef) {
                setData(data);
            }
            return data;
        } catch (error: any) {
            //catch会消化异常，如果不抛出外面接收不到异常
            setError(error);
            if(config.throwOnError) return Promise.reject(error);
            return error;
        }
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        ...state,
        run
    }
}