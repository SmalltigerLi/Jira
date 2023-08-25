import qs from "qs";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { List } from "./list"
import { SearchPanel } from "./search-panel"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [list, setList] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const debouncedParam = useDebounce(param, 200);
    const client = useHttp();

    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList);
    }, [debouncedParam]);

    useMount(() => {
        client('users').then(setUsers);
        
    });
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}

