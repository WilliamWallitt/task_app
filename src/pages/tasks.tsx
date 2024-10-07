import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import styles from "./index.module.css";
import React, {useEffect, useState} from "react";
import {Hint as PrismaHint, Hint_Bullet, Task as PrismaTask} from "@prisma/client";
// import {trpc} from "~/utils/trpc";
import {Field, Type} from "~/pages/field";
import {Status as NavStatus} from "~/shared/navbar/navbar";
import {Hints} from "~/pages/hints";
import {Intro} from "~/pages/intro";
import {TasksBarChart} from "~/pages/tasksBarChart";
import {TaskContent} from "~/pages/task";
import {TasksRadialChart} from "~/pages/tasksRadialChart";
import Toggle from "react-toggle";
import {api} from "~/utils/api";

// Define allowed status values
export const Status = {
    DRAFT: 'DRAFT',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
} as const;

// Create a union type from the Status object
export type StatusType = typeof Status[keyof typeof Status];

export type Task = Omit<PrismaTask, 'status'> & { status: StatusType };

export interface Hint extends PrismaHint {
    bullets: Hint_Bullet[]
}

interface TasksProps {
    taskData: Task[];
    hintData:  Hint[];
    setStatus: (status: NavStatus) => void;
    view: View;
    pdfViewer: React.JSX.Element;
}

export enum View {
    TASKS,
    FILE
}

TimeAgo.addLocale(en)

export default function Tasks({hintData, taskData, setStatus, view, pdfViewer}: TasksProps) {
    const timeAgo = new TimeAgo('en-US')

    const [tasks, setTasks] = useState<Task[]>(taskData)
    const [id, setId] = useState<number | undefined>(undefined)
    const [searchInput, setSearchInput] = useState<string>("")
    const [dropdown, setDropdown] = useState<keyof Task>("task")
    const [input, setInput] = useState<string>("")
    const [graphFilter, setGraphFilter] = useState<StatusType | "ALL">("COMPLETED")
    const [showAll, setShowAll] = useState<boolean>(false)

    const handleClickScroll = (id: string | undefined) => {
        if (!id) {
            return undefined
        }
        const element = document.getElementById(id.toString());
        if (element) {
            element.scrollTo({
                top: element.getBoundingClientRect().top,
                left: element.getBoundingClientRect().left,
                behavior: 'smooth'
            });
        }
    };

    const addTaskMutation = api.task.add.useMutation()
    const deleteTaskMutation = api.task.delete.useMutation()
    const updateTaskMutation = api.task.update.useMutation()

    // useEffect(() => {
    //     const addSubscription = trpc.onAdd.subscribe(undefined,  {
    //         onError: (err) => {
    //             console.error('Subscription error:', err);
    //         },
    //         onData: (task) => {
    //             task && setTasks((prevTasks) => [task as Task, ...prevTasks])
    //             setInput("")
    //             tasks && setStatus({
    //                 task: task as Task,
    //                 field: "task",
    //                 action: "ADDED"
    //             })
    //         }
    //     })
    //     // Use tRPC subscription to listen for 'onAdd' events
    //     const updateSubscription = trpc.onUpdate.subscribe(undefined, {
    //         onError: (err) => {
    //             console.error('Subscription error:', err);
    //         },
    //         onData: (task) => {
    //             task && setTasks((prevTasks) => prevTasks.map(x => x.id === task.id ? task as Task : x));
    //             tasks && setStatus({
    //                 task: task as Task,
    //                 field: "task",
    //                 action: "UPDATED"
    //             })
    //         }
    //     })
    //
    //     const deleteSubscription = trpc.onDelete.subscribe(undefined, {
    //         onError: (err) => {
    //             console.error('Subscription error:', err);
    //         },
    //         onData: (task) => {
    //             task && setTasks((prevTasks) => prevTasks.filter(x => x.id !== task.id))
    //             tasks && setStatus({
    //                 task: task as Task,
    //                 field: "task",
    //                 action: "DELETED"
    //             })
    //         }
    //     })
    //
    //     return () => {
    //         addSubscription.unsubscribe()
    //         updateSubscription.unsubscribe()
    //         deleteSubscription.unsubscribe()
    //     }
    // }, []);

    const func = (a: Task, b: Task): number => {

        let aIncludes = true
        let bIncludes = true

        if (typeof a[dropdown] === "string" && typeof b[dropdown] === "string") {
            aIncludes = a[dropdown].toLowerCase().includes(searchInput.toLowerCase());
            bIncludes = b[dropdown].toLowerCase().includes(searchInput.toLowerCase());

            // If both include or both don't include, keep their original order
            if (aIncludes && bIncludes) return 0;
            if (!aIncludes && !bIncludes) return 0;

            // If 'a' includes the input, sort it before 'b'
            if (aIncludes) return -1;

            // If 'b' includes the input, sort it before 'a'
            return 1;
        }

        if (typeof a[dropdown] === "number" && typeof b[dropdown] === "number") {
            const searchValue = Number.parseInt(searchInput);

            if (a[dropdown] == searchValue) return -1
            if (b[dropdown] == searchValue) return 1
            return b[dropdown] - a[dropdown]
        }
        return 0

    }

    useEffect(() => {
        setTasks((prevState) => searchInput === ""
            ? [...prevState].sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
            : [...prevState].sort(func))
    }, [searchInput, dropdown]);

    const handleAddTask = () => {
        // Trigger the mutation to add a new task
        // trpc.add.mutate(input)
        addTaskMutation.mutate(input, {
            onSuccess: (task) => {
                task && setTasks((prevTasks) => [task as Task, ...prevTasks])
                setInput("")
                tasks && setStatus({
                    task: task as Task,
                    field: "task",
                    action: "ADDED"
                })
            }
        })
    };

    const handleUpdateTask = (id: number) => {
        // Trigger the mutation to add a new task
        const task = tasks.find(x => x.id === id)
        // task && trpc.update.mutate(task)
        task && updateTaskMutation.mutate(task, {
            onSuccess: (task) => {
                task && setTasks((prevTasks) => prevTasks.map(x => x.id === task.id ? task as Task : x));
                tasks && setStatus({
                    task: task as Task,
                    field: "task",
                    action: "UPDATED"
                })
            }
        })
    };

    const handleDeleteTask = (id: number) => {
        // Trigger the mutation to add a new task
        // trpc.delete.mutate(id)
        deleteTaskMutation.mutate(id, {
            onSuccess: (task) => {
                task && setTasks((prevTasks) => prevTasks.filter(x => x.id !== task.id))
                tasks && setStatus({
                    task: task as Task,
                    field: "task",
                    action: "DELETED"
                })
            }
        })
    };

    useEffect(() => {
        handleClickScroll(id?.toString())
    }, [tasks]);

    if (view === View.FILE ) {
        return (
            <div className={styles.main}>
                {pdfViewer}
            </div>
        )
    }

    return (
        <>
            <main className={styles.main}>
                <div className={`${styles.col} ${styles.width_100}`}>
                    <Intro/>
                    <div className={`${styles.row} ${styles.task_row} ${styles.width_100}`}>
                        <Hints hintData={hintData}/>
                        <div className={styles.col}>

                            <TasksRadialChart tasks={tasks}/>
                            <div className={`${styles.row} ${styles.row_center}`}
                                 style={{justifyContent: "center"}}>
                                <p className={styles.margin_10px}><strong className="clickable"
                                           onClick={() => setGraphFilter("ALL")}>{tasks.length}</strong> Tasks&nbsp;&#x2022;&nbsp;
                                    <strong className="clickable"
                                            onClick={() => setGraphFilter("COMPLETED")}>{tasks.filter(x => x.status === "COMPLETED").length}</strong> completed&nbsp;&#x2022;&nbsp;
                                    <strong className="clickable"
                                            onClick={() => setGraphFilter("IN_PROGRESS")}>{tasks.filter(x => x.status === "IN_PROGRESS").length}</strong> in
                                    progress&nbsp;&#x2022;&nbsp;<strong className="clickable"
                                                                        onClick={() => setGraphFilter("DRAFT")}>{tasks.filter(x => x.status === "DRAFT").length}</strong> pending
                                    &nbsp;&#x2022;&nbsp;<strong className="clickable"
                                                                onClick={() => setGraphFilter("FAILED")}>{tasks.filter(x => x.status === "FAILED").length}</strong> failed
                                </p>
                            </div>

                            <TasksBarChart graphFilter={graphFilter} tasks={tasks}/>

                            <div className={`${styles.row} ${styles.width_100}`}
                                 style={{justifyContent: "center"}}>
                                <div
                                    className={`${styles.col_cheat} ${styles.width_100} ${styles.padding_10px}`}>
                                    <h1>Create a Task</h1>
                                    <textarea rows={6} placeholder={"Task"} value={input}
                                              onChange={(e) => setInput(e.target.value)}/>
                                    <button style={{marginTop: "10px"}}
                                            onClick={() => handleAddTask()}>Add
                                    </button>
                                </div>
                            </div>

                            {tasks && tasks.length > 0 &&
                                <div className={`${styles.row} ${styles.row_wrap}`}
                                     style={{justifyContent: "center"}}>
                                    <div className={`${styles.row} ${styles.task}`}>
                                        <Field rows={1} inputLength={0} onUpdateHandler={(input) => {
                                            setSearchInput(input)
                                        }} type={Type.Text} placeholder={"Search"}/>
                                        <select onChange={(e) => setDropdown(e.target.value as keyof Task)}>
                                            {tasks[0] && Object.keys(tasks[0]).map(x => (
                                                <option selected={dropdown === x} id={x}
                                                        value={x}>{x}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            }

                            <div className={`${styles.row} ${styles.row_wrap}`}
                                 style={{justifyContent: "center"}}>
                                <div className={`${styles.col_all_center} ${styles.margin_10px}`}>
                                    <Toggle defaultChecked={showAll}
                                        onChange={(e) => setShowAll(e.target.checked)}/>
                                    <span style={{marginTop: "10px"}}>Show all Hints</span>
                                </div>
                            </div>

                            <div className={`${styles.row} ${styles.row_wrap}`}
                                 style={{justifyContent: "center"}}>
                                {tasks && tasks.length > 0 ? (!showAll ? tasks.slice(0, 15) : tasks).map(x => (
                                    <TaskContent setId={setId} x={x} tasks={tasks} setTasks={setTasks}
                                                 handleDeleteTask={handleDeleteTask}
                                                 handleUpdateTask={handleUpdateTask}/>
                                )) : <p>No tasks found.</p>}
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
