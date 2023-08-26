import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
        setSearchParam,
    ] as const;
};
