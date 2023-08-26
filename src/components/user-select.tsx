import { useUsers } from "../utils/user"
import { IdSelet } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelet>) => {
    const {data: users} = useUsers();
    return <IdSelet options={users || []} {...props}></IdSelet>
}