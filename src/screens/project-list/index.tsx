import styled from "@emotion/styled";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { Typography } from 'antd'
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200);
    const {isLoading, error, data: list} = useProjects(debouncedParam);
    const {data: users} = useUsers()
    useDocumentTitle('项目列表', false);

    return (
        <ScreenContainer>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []}/>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} dataSource={list || []} users={users || []}/>
        </ScreenContainer>
    )
}

const ScreenContainer = styled.div`
    padding: 3.2rem;
`