import React, {useEffect, useRef, useState} from "react";
import {Hint, Task, Task as T} from "./tasks"
import styles from "~/pages/index.module.css";
import ReactStars from "react-stars";
import {Copy, Loader, Send, Slack, XCircle} from "react-feather";
import {Field, Type} from "~/components/field";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {GetGPTRequest} from "~/utils/gpt";
import {entireStateUser, entireStateUsers, useAppDispatch, useAppSelector} from "~/redux/store";
import {Levels} from "~/components/userLoginSignup";
import {action} from "~/redux/state";
import {api} from "~/utils/api";
import {Comments} from "~/components/comments";
import { motion } from "framer-motion";
import {generateTaskPrompt, generateTaskTitlePrompt} from "~/utils/gptTaskPrompt";

interface TaskProps {
    x: T,
    setId: (id: number) => void,
    setTasks: (task: T[]) => void,
    tasks: T[],
    key: number,
    isAdmin: boolean,
    hints: Hint[]
}

enum GPTType {
    Task,
    Title
}

TimeAgo.addLocale(en)


export const TaskContent = ({key, x, setId, setTasks, tasks, isAdmin, hints}: TaskProps) => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(entireStateUsers)
    const user = useAppSelector(entireStateUser)

    const isMountingRef = useRef(false);
    const timeAgo = new TimeAgo('en-US')

    // gpt stuff
    const [loadingGpt, setLoadingGpt] = useState<boolean>(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    // const [selectedLevel, setSelectedLevel] = useState<keyof Levels>("Beginner" as keyof Levels)

    const updateTaskMutation = api.task.update.useMutation()
    const deleteTaskMutation = api.task.delete.useMutation()

    const handleDeleteTask = (id: number) => {

        deleteTaskMutation.mutate(id, {
            onSuccess: (task) => {
                if (task) {
                    const newTasks = tasks.filter(x => x.id !== task.id)
                    dispatch(action({taskData: newTasks, status: {
                            task: task as Task,
                            field: "task",
                            action: "DELETED"
                        }}))
                }
            },
            onError: (err) => {
                alert(err)
            }
        })
    };

    const handleUpdateTask = (id: number) => {
        // Trigger the mutation to add a new task
        const task = tasks.find(x => x.id === id)
        // task && trpc.update.mutate(task)
        if (task) {
            user && updateTaskMutation.mutate({
                ...task,
                userIds: task.users.map(x => x.userId),
                userId: user.id,
                archive: task.archived
            }, {
                onSuccess: (task) => {
                    if (task) {
                        const newTasks = tasks.map(x => x.id === task.id ? task as Task : x)
                        dispatch(action({taskData: newTasks, status: {
                                task: task as Task,
                                field: "task",
                                action: "UPDATED"
                            }}))
                    }

                },
                onError: (err) => {
                    alert(err)
                }
            })}
    };


    const generate_gpt_prompt = (type: GPTType, task: string = '') => {

        switch (type) {
            case GPTType.Task:
                const foundUser = users.find(x => x.id === selectedUserId)
                if (!foundUser) {
                    return ""
                }
                return generateTaskPrompt(foundUser)

                // const all_hints = hints.map(x => `- ${x.hint}`).join("\n");

//                 return `Using the following learning topics:
// ${all_hints}
//
// Generate a **unique** programming problem for a **${selectedLevel} Python student**.
// The problem should be related to **finance, science, or art** (randomly pick one). The problem should NOT include any external files to be used.
//
// Do not include a title, explanation or any extra details, just output the problem statement.`;

            case GPTType.Title:
                return generateTaskTitlePrompt(task)
        }
    }

    const generate_gpt_problem = (type: GPTType, task: string = '') => {
        setLoadingGpt(true)

        GetGPTRequest({
            messages: [{ role: "user", content: generate_gpt_prompt(type, task) }],
            model: 'o3-mini-2025-01-31'
        }, (message) => {
            switch (type) {
                case GPTType.Task:
                    setTasks(tasks.map(task => task.id === x.id
                        ? {...x, task: message.content}
                        : task))
                    break;
                case GPTType.Title:
                    setTasks(tasks.map(task => task.id === x.id
                        ? {...x, title: message.content}
                        : task))
                    break;
            }
            setLoadingGpt(false)
        })
    }


    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    // useEffect(() => {
    //     // isMountingRef.current && handleUpdateTask(x.id)
    // }, [x.comments])

    const renderAssignedUsers = (x: T) => {
        const taskUsers = x.users.map(tu => tu.userId)
        const taskUsersInfo = users.filter(u => taskUsers.includes(u.id))
        const notTaskUsersInfo = users.filter(u => !taskUsers.includes(u.id))

        return (
            <div id={x.id.toString()} className={`${styles.row} ${styles.row_center}`}>
                {taskUsersInfo.map(tu => (
                    <>
                        <img id={tu.id.toString()} onClick={() => {
                            if (isAdmin) {
                                setTasks(tasks.map(task => task.id === x.id
                                    ? {...x, users: x.users.filter(u => u.userId !== tu.id)}
                                    : task))
                            }
                        }} className={styles.task_avatar} title={isAdmin ? "Remove: " + tu.name  : tu.name}
                             alt={"user img"}
                             src={`data:image/*;base64,${tu.image?.image}`}/>
                    </>
                ))
                }
                {notTaskUsersInfo.length > 0 && isAdmin &&
                    <div className={`${styles.row} ${styles.row_center} ${styles.margin_6px}`}>
                        <select onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}>
                            <option>--Select User--</option>
                            {notTaskUsersInfo.map(x => (
                                <option selected={selectedUserId === x.id} id={x.id.toString()} value={x.id}>
                                    {x.name}
                                </option>
                            ))}
                        </select>
                        {selectedUserId &&
                            <button onClick={() => {
                                setTasks(tasks.map(task => task.id === x.id
                                    ? {...x, users: [...x.users, {userId: selectedUserId, taskId: task.id}]}
                                    : task))
                            }}>
                                Add
                            </button>
                        }

                    </div>
                }
            </div>
        )
    }

    return (
        <div
            key={key} className={`${styles.col} ${styles.task}`}
            id={x.id.toString()}
            onMouseEnter={() => setId(x.id)}>

            <div className={`${styles.row} ${styles.row_center} ${styles.width_100}`} style={{justifyContent: "space-between"}}>
                <h1 style={{width: isAdmin ? "60%" : "auto"}}>{x.title}</h1>
                {isAdmin &&
                    <>
                        {!loadingGpt &&
                            <>
                                <button onClick={() => generate_gpt_problem(GPTType.Title, x.task)}>
                                    Suggest Title (GPT)
                                </button>
                            </>
                        }
                        {loadingGpt &&
                            <button>
                                <Loader className={styles.loading_icon} size={14}/>
                            </button>
                        }
                    </>
                }
            </div>

            {renderAssignedUsers(x)}

            <div className={`${styles.row}`}>
                <p>id: <span
                    className={styles.tag}>{x.id}</span>&nbsp;&#x2022;&nbsp;added <span
                    className={styles.tag}>{timeAgo.format(x.createdAt)}</span>&nbsp;&#x2022;&nbsp;updated <span
                    className={styles.tag}>{timeAgo.format(x.updatedAt)}</span>&nbsp;&#x2022;&nbsp;
                    <span
                        className={styles.tag}>{x.attempts}</span> attempts
                </p>
            </div>
            <div className={`${styles.row} ${styles.row_center} ${styles.all_margin_10_px}`}>
                <p className={`${(x.status === "DRAFT") ? styles.draft : x.status === "IN_PROGRESS" ? styles.in_progress : x.status === "FAILED" ? styles.failed : styles.completed} ${styles.small_text}`}>
                    {x.status}
                </p>

                <ReactStars edit={isAdmin} value={x.difficulty} half={false} count={10}
                            onChange={(new_rating) => {
                                setTasks(tasks.map(task => task.id === x.id
                                    ? {...x, difficulty: new_rating}
                                    : task))
                            }}
                            color1={"var(--bg-color-light)"}
                            color2={"var(--link-color)"}/>

                <button onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUpdateTask(x.id)
                }}>
                    Update
                    <Send size={14}/>
                </button>

                {isAdmin &&
                    <button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDeleteTask(x.id)
                    }} className={styles.alert_text}>
                        Delete
                        <XCircle size={14}/>
                    </button>
                }
            </div>
            {isAdmin &&
                <div className={`${styles.row} ${styles.row_center}`}>
                    <button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setTasks(tasks.map(task => task.id === x.id
                            ? {...x, completed: !x.completed, status: "COMPLETED"}
                            : task))
                    }}>
                        {x.completed ? "Mark as Incomplete  " : "Mark as Complete"}
                    </button>

                    {(x.status !== "FAILED" && x.status !== "COMPLETED") &&
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setTasks(tasks.map(task => task.id === x.id
                                ? {...x, status: "FAILED"}
                                : task))
                        }}>
                            Mark as Failed
                        </button>
                    }

                    <button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setTasks(tasks.map(task => task.id === x.id
                            ? {...x, archived: !x.archived}
                            : task))
                    }}>
                        {x.archived ? "Restore" : "Archive"}
                    </button>
                </div>
            }

            <div className={`${styles.col} ${styles.width_100} ${styles.margin_y_10px}`}>
                <h1>Task <Copy
                    onClick={(e) => window.isSecureContext && window.navigator.clipboard.writeText(x.task)}
                    size={14}/></h1>

                {
                    isAdmin && <div className={`${styles.row} ${styles.margin_y_10px} ${styles.row_center}`}
                                    style={{flexWrap: "nowrap"}}>

                        {!loadingGpt &&
                            <>
                                <button onClick={() => generate_gpt_problem(GPTType.Task)}>
                                    Suggest Task (GPT)
                                </button>
                            </>
                        }
                        {loadingGpt &&
                            <button>
                                <Loader className={styles.loading_icon} size={14}/>
                            </button>
                        }

                        <select
                            onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}>
                            <option>--Select User--</option>
                            {users.map(x => (
                                <option selected={selectedUserId === x.id} id={x.id.toString()} value={x.id}>
                                    {x.name}
                                </option>
                            ))}
                        </select>

                    </div>
                }

                {x.completed ?
                    <p style={{whiteSpace: "pre-wrap"}}>{x.task}</p> :
                    <Field value={x.task}
                           onUpdateHandler={(input) => {
                               setTasks(tasks.map(task => task.id === x.id
                                   ? {...x, task: input}
                                   : task))
                           }}
                           type={Type.Text} placeholder={"Task"}/>
                }
            </div>
            <div
                className={`${styles.col} ${styles.width_100} ${styles.margin_y_10px}`}>
                <h1>Answer <Copy
                    onClick={(e) => window.isSecureContext && window.navigator.clipboard.writeText(x.answer)}
                    size={14}/></h1>
                <Field inputLength={0} value={x.answer}
                       onUpdateHandler={(input) => {
                           setTasks(tasks.map(task => task.id === x.id
                               ? {...x, answer: input}
                               : task))
                       }} disabled={x.completed} type={Type.Code}
                       placeholder={"Answer"}/>
            </div>

            <div
                className={`${styles.col} ${styles.width_100} ${styles.margin_y_10px}`}>
                <h1>Notes <Copy
                    onClick={(e) => window.isSecureContext && window.navigator.clipboard.writeText(x.comments)}
                    size={14}/></h1>
                <Field inputLength={0} value={x.comments}
                       onUpdateHandler={() => {}} disabled={true} type={Type.Text}
                       placeholder={""}/>
            </div>

            <Comments isAdmin={isAdmin} comment={x.Comment} taskId={x.id}/>
        </div>
    )
}