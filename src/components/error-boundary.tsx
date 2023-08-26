import React, { ReactNode } from "react";

type FallbackRender = (props: {error: Error | null}) => React.ReactElement;
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>, {error: Error | null}> {
    state = {error: null};
    //当子组件抛出异常，这里会接收到并且调用,将error返回
    static getDeriveedStateFromError(error: Error) {
        return {error};
    }

    render() {
        const {error} = this.state;
        const {fallbackRender, children} = this.props;
        if (error) {
            return fallbackRender(error);
        } else {
            return children;
        }
    }
}