import styled from "@emotion/styled";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { Typography, Button } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    useDocumentTitle("项目列表", false);
    const dispatch = useDispatch();
    const [param, setParam] = useProjectSearchParams();
    const {
        isLoading,
        error,
        data: list,
        retry,
    } = useProjects(useDebounce(param, 200));
    const { data: users } = useUsers();

    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding
                    type="link"
                    onClick={() =>
                        dispatch(projectListActions.openProjectModal())
                    }
                >
                    创建项目
                </ButtonNoPadding>
            </Row>

            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            {error ? (
                <Typography.Text type="danger">{error.message}</Typography.Text>
            ) : null}
            <List
                projectButton={props.projectButton}
                refresh={retry}
                loading={isLoading}
                dataSource={list || []}
                users={users || []}
            />
        </ScreenContainer>
    );
};
ProjectListScreen.whyDidYouRender = true;
const ScreenContainer = styled.div`
    padding: 3.2rem;
`;
