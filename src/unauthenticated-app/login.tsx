import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import {Form, Input, Typography} from 'antd'
import { LongButton } from ".";
import { useAsync } from "../utils/use-async";
export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
    const {login} = useAuth();
    const {run, isLoading, error} = useAsync(undefined, {throwOnError: true});
    const handleSubmit = (values: {username: string, password: string, cpassword: string}) => {
        // event.preventDefault();
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        run(login(values)).catch(onError);
    }
    return (
        <Form onFinish={handleSubmit}>
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <Form.Item name={'username'} rules={[{required:true, message: '请输入用户名'}]}>
                <Input placeholder={'用户名'}type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'}/>
            </Form.Item>
            
            <Form.Item>
                <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
            </Form.Item>
        </Form>
    )
    
}