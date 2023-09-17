import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectModalOpen } from "../../store";
import { projectListActions } from "./project-list.slice";

export const ProjectModal = () => {
    const dispatch = useDispatch();
    const projectModalOpen = useSelector(selectProjectModalOpen);
    return (
        <Drawer
            onClose={() => dispatch(projectListActions.closeProjectModal())}
            open={projectModalOpen}
            width={"100%"}
        >
            <h1>Project Modal</h1>
            <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
        </Drawer>
    );
};
