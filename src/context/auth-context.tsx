import React, { ReactNode, useState } from "react";
import * as auth from '../auth-provider'
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../screens/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";

interface AuthForm {
    username: string;
    password: string;
}
const AuthContext = React.createContext<{
    user: User | null;
    login: (form: AuthForm) => Promise<void>;
    register: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | null>(null);
AuthContext.displayName = 'AuthContext';

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if(token) {
        const data = await http('me', {token});
        user = data.user;
    }
    return user;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const {data:user, setData: setUser, error, isLoading, isIdle, isError, run}  = useAsync<User | null>();
    
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));
    
    useMount(() => {
        bootstrapUser().then(setUser);
    })
    if(isIdle || isLoading) {
        return <FullPageLoading/>
    }
    if(isError){
        return <FullPageErrorFallback error={error}/>
    }
    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用');
    }
    return context;
}