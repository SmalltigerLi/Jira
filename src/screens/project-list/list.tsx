import { User } from "./search-panel";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
    setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject();
    const pinProject = (id: number) => (pin: boolean) =>
        mutate({ id, pin }).then(props.refresh);
    const items = [
        {
            label: (
                <ButtonNoPadding
                    type="link"
                    onClick={() => props.setProjectModalOpen(true)}
                >
                    编辑
                </ButtonNoPadding>
            ),
            key: "edit",
        },
    ];
    return (
        <Table
            pagination={false}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(value, project) {
                        return (
                            <Pin
                                checked={project.pin}
                                onCheckedChange={pinProject(project.id)}
                            />
                        );
                    },
                },
                {
                    title: "名称",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return (
                            <Link to={`/projects/${String(project.id)}`}>
                                {project.name}
                            </Link>
                        );
                    },
                },
                {
                    title: "部门",
                    dataIndex: "organization",
                },
                {
                    title: "负责人",
                    render(value, project) {
                        return (
                            <span>
                                {
                                    users.find(
                                        (user: User) =>
                                            user.id === project.personId
                                    )?.name
                                }
                            </span>
                        );
                    },
                },
                {
                    title: "创建时间",
                    render(value, project) {
                        return (
                            <span>
                                {project.created
                                    ? dayjs(project.created).format(
                                          "YYYY-MM-DD"
                                      )
                                    : "无"}
                            </span>
                        );
                    },
                },
                {
                    render(value, project) {
                        return (
                            <Dropdown menu={{ items }}>
                                <ButtonNoPadding type="link">
                                    ...
                                </ButtonNoPadding>
                            </Dropdown>
                        );
                    },
                },
            ]}
            {...props}
        ></Table>
    );
};
