import React, {useEffect, useState} from "react";
import {Task} from "~/components/tasks";
import {isArray} from "is-what";
import styles from "~/pages/index.module.css";
import {Field, Type} from "~/components/field";
import {entireStateUser, entireStateUsers, useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import {AnimatePresence, motion} from "framer-motion";

interface SearchTasksProps {
    setTasks: (tasks: Task[]) => void;
    tasks: Task[];
    isAdmin: boolean
}

export const SearchTasks = ({tasks, setTasks}: SearchTasksProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {taskData, filters} = state
    const {searchInput, dropdown, selectedUserFilterId} = filters

    const user = useAppSelector(entireStateUser)
    const users = useAppSelector(entireStateUsers)

    useEffect(() => {
        setTasks(sortTaskData())
    }, [taskData]);

    const sortTaskData = (): Task[] => {
        const taskDataClone = [...taskData]
        return searchInput === "" ? taskDataClone.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1) : taskDataClone.sort(func)
    }

    useEffect(() => {
        setTasks(sortTaskData())
    }, [searchInput, dropdown]);

    const func = (a: Task, b: Task): number => {

        let aIncludes = true
        let bIncludes = true

        if (isArray(a[dropdown]) && isArray(b[dropdown])) {
            if (a[dropdown].toString().toLowerCase().includes(searchInput.toLowerCase())) return -1
            if (b[dropdown].toString().toLowerCase().includes(searchInput.toLowerCase())) return 1
            return 0
        } else if (typeof a[dropdown] === "string" && typeof b[dropdown] === "string") {
            aIncludes = a[dropdown].toLowerCase().includes(searchInput.toLowerCase());
            bIncludes = b[dropdown].toLowerCase().includes(searchInput.toLowerCase());

            // If both include or both don't include, keep their original order
            if (aIncludes && bIncludes) return 0;
            if (!aIncludes && !bIncludes) return 0;

            // If 'a' includes the input, sort it before 'b'
            if (aIncludes) return -1;

            // If 'b' includes the input, sort it before 'a'
            return 1;
        } else if (typeof a[dropdown] === "number" && typeof b[dropdown] === "number") {
            const searchValue = Number.parseInt(searchInput);


            if (a[dropdown] == searchValue) return -1
            if (b[dropdown] == searchValue) return 1
            return b[dropdown] - a[dropdown]
        } else if (typeof a[dropdown] === "boolean" && typeof b[dropdown] === "boolean") {

            let jsonInput = "0"
            try {
                jsonInput = JSON.parse(searchInput)
            } catch (err) {
            }

            const searchBool = Boolean(jsonInput)
            if (a[dropdown] == searchBool) return -1
            if (b[dropdown] == searchBool) return 1
            return (a[dropdown] && b[dropdown]) ? 0 : a[dropdown] ? -1 : 1
        } else {
            return 0
        }
    }

    const renderFilterTasksByUser = () => {
        return (
            <>
                {user?.role === "MASTER" && <select onChange={(e) => {
                    if (e.target.value === "All users") {
                        setTasks(sortTaskData())
                        dispatch(action({filters: {...filters, selectedUserFilterId: null}}))
                    } else {
                        const id = parseInt(e.target.value)
                        setTasks(sortTaskData().filter(x => x.users.map(u => u.userId).includes(id)))
                        dispatch(action({filters: {...filters, selectedUserFilterId: id}}))
                    }
                }}>
                    <option selected={selectedUserFilterId === null}>All users</option>
                    {users.map(u => (
                        <option selected={u.id === selectedUserFilterId} key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>}
            </>
        )
    }


    return (
        <>
            {taskData && taskData.length > 0 &&
                <div className={`${styles.row} ${styles.row_wrap}`}
                     style={{justifyContent: "center"}}>
                    <div className={`${styles.row} ${styles.task} ${styles.all_margin_10_px}`}
                         style={{
                             background: "transparent",
                             flexWrap: "nowrap",
                             alignItems: "center"
                         }}>
                        {/*onChangeHandler={(input) => setSearchInput(input)}*/}
                        <Field rows={1} value={searchInput} inputLength={0} onUpdateHandler={(input) => {
                            dispatch(action({filters: {...filters, searchInput: input}}))
                        }} type={Type.Text} placeholder={"Search"}/>
                        <select onChange={(e) => dispatch(action({filters: {...filters, dropdown: e.target.value as keyof Task}}))}>
                            {tasks[0] && Object.keys(tasks[0]).filter(x => x !== "users" && x !== "createdAt" && x !== "updatedAt").map((x, i) => (
                                <option key={i} selected={dropdown === x} id={x} value={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                        {renderFilterTasksByUser()}
                    </div>
                </div>
            }
        </>
    )

}