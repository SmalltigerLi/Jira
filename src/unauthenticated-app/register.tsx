import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import {Form, Input, Button} from 'antd'
import { LongButton } from ".";
const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
    const {register, user} = useAuth();
    const handleSubmit = ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        // event.preventDefault();
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        if(cpassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'));
            return;
        }
        register(values);
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true, message: '请输入用户名'}]}>
                <Input placeholder={'用户名'}type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'}/>
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{required:true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type="password" id={'cpassword'}/>
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>注册</LongButton>
            </Form.Item>
        </Form>
    )
}