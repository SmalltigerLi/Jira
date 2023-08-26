import { User } from "./search-panel";
import {Table, TableProps} from 'antd'
import dayjs from "dayjs";
import  { Link } from 'react-router-dom'
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project>{
    users: User[]
}

export const List = ({users, ...props}: ListProps) => {
    return <Table pagination={false} columns={[{
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
            return (
                <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
            )
        }
    }, {
        title: '部门',
        dataIndex: 'organization',
    },
    {
        title: '负责人',
        render(value, project) {
            return <span>
                {users.find((user: User) => user.id === project.personId)?.name}
            </span>
        }
    },
    {
        title: '创建时间',
        render(value, project) {
            return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}
            </span>
        }
    }
    ]}
    {...props} 
    >
    </Table>
}