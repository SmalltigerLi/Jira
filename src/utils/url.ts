import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from ".";

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();
    return [
        useMemo(() => 
            keys.reduce((pre, value) => {
                return { ...pre, [value]: searchParams.get(value) || "" };
            }, {} as { [key in K]: string }), 
        [setSearchParam]),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
            return setSearchParam(o);
        }
    ] as const;
};
