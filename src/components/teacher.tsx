import styles from "../pages/index.module.css";
import React, {useState} from "react";
import {Field, Type} from "~/components/field";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import {generateProgrammingNotesPrompt, generateTaskPrompt, generateTaskTitlePrompt} from "~/utils/gptTaskPrompt";
import {GetGPTRequest} from "~/utils/gpt";
import {Loader} from "react-feather";
import {Task} from "~/components/tasks";
import {api} from "~/utils/api";

interface TeacherProps {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
}

export const Teacher = ({tasks, setTasks}: TeacherProps) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)

    const {generatedTask, users, user} = state
    const [loadingGpt, setLoadingGpt] = useState<boolean>(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

    const addTaskMutation = api.task.add.useMutation()
    const updateTaskMutation = api.task.update.useMutation()

    const handleAddTask = () => {
        // Trigger the mutation to add a new task
        // trpc.add.mutate(input)
        if (user) {
            addTaskMutation.mutate({
                task: generatedTask.task,
                userIds: [user.id]
            }, {
                onSuccess: (task) => {
                    if (task) {
                        updateTaskMutation.mutate({
                            ...(task as Task),
                            userIds: task.users.map(x => x.userId),
                            userId: user.id,
                            archive: task.archived,
                            comments: generatedTask.notes,
                            title: generatedTask.title
                        }, {
                            onSuccess: (task) => {
                                if (task) {
                                    dispatch(action({taskData: [task as Task, ...tasks], status: {
                                            task: task as Task,
                                            field: "task",
                                            action: "UPDATED"
                                        }}))
                                }
                            },
                            onError: (err) => {
                                alert(err)
                            }
                        })
                    }
                    if (tasks) {
                        dispatch(action({
                            status: {
                                task: task as Task,
                                field: "task",
                                action: "ADDED"
                            }
                        }))
                    }
                },
                onError: (err) => {
                    alert(err)
                }
            })
        }
    };

    const generate = () => {
        const user = users.find(x => x.id === selectedUserId)
        if (user) {
            setLoadingGpt(true)

            GetGPTRequest({
                messages: [{role: "user", content: generateTaskPrompt(user)}],
                model: 'o3-mini-2025-01-31'
            }, (x) => {

                GetGPTRequest({
                    messages: [{role: "user", content: generateTaskTitlePrompt(x.content)}],
                    model: 'o3-mini-2025-01-31'
                }, (y) => {
                    GetGPTRequest({
                        messages: [{role: "user", content: generateProgrammingNotesPrompt(user, {title: y.content, task: y.content})}],
                        model: 'o3-mini-2025-01-31'
                    }, (z) => {
                        setLoadingGpt(false)
                        dispatch(action({generatedTask: {task: x.content, title: y.content, notes: z.content}}))
                    })
                })
            })
        }
    }

    return (
        <div className={`${styles.main} ${styles.padding_10px}`}>
            <div className={`${styles.row} ${styles.row_center}`}>
                <select
                    onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}>
                    <option>--Select User--</option>
                    {users.map(x => (
                        <option selected={selectedUserId === x.id} id={x.id.toString()} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>

                {!loadingGpt && selectedUserId && <button onClick={() => {
                    generate()
                }}>
                    Generate Task
                </button>}
                {loadingGpt &&
                    <button>
                        <Loader className={styles.loading_icon} size={14}/>
                    </button>
                }
                <button onClick={() => handleAddTask()}>
                    Add as Task
                </button>
            </div>
            {generatedTask.task.length > 0 && <div className={`${styles.row} ${styles.width_100}`}>
                {/*task*/}
                <div className={`${styles.col}`}>
                    <h1>{generatedTask.title}</h1>
                    <Field onUpdateHandler={() => {
                    }} disabled={true} type={Type.Code}
                           value={generatedTask.task}
                           style={{background: "transparent"}}
                           placeholder={""}/>
                    {/*<p style={{whiteSpace: "pre"}}>{generatedTask.task}</p>*/}
                </div>
                {/*notes*/}
                <div className={`${styles.col}`}>
                    <h1>Notes</h1>
                    <Field disabled={true} onUpdateHandler={() => {
                    }} type={Type.Code}
                           value={generatedTask.notes}
                           style={{background: "transparent"}}
                           placeholder={""}/>
                    {/*<p style={{whiteSpace: "pre"}}>{generatedTask.notes}</p>*/}
                </div>
            </div>}


        </div>
    )
}