import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes } from "react-router";
import { ProjectScreen } from "./screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    return (
        <div>
            <Container>
                <PageHeader setProjectModalOpen={setProjectModalOpen}/>
                <Main>
                    <Router>
                        <Routes>
                            <Route
                                path={"/projects"}
                                element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>}
                            />
                            <Route
                                path={"/projects/:projectId/*"}
                                element={<ProjectScreen />}
                            />
                            <Route index element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>} />
                        </Routes>
                    </Router>
                </Main>
                <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
            </Container>
        </div>
    );
};
const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}>
                        <Button onClick={logout} type={"link"}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    );
};
const PageHeader = (props: {setProjectModalOpen: (isOpen: boolean) => void} ) => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type="link" onClick={resetRoute}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
                </ButtonNoPadding>
                <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/>
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    );
};
const Container = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: 6rem 1fr 6rem;
`;
const Main = styled.main`
    height: calc(100vh - 6rem);
`;
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
