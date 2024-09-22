import React, {useEffect, useRef} from "react";
import {Task as T} from "./tasks"
import styles from "~/pages/index.module.css";
import ReactStars from "react-stars";
import {Copy} from "react-feather";
import {Field, Type} from "~/pages/field";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

interface TaskProps {
    x: T,
    setId: (id: number) => void,
    setTasks: (task: T[]) => void,
    tasks: T[],
    handleUpdateTask: (id: number) => void,
    handleDeleteTask: (id: number) => void,
}

TimeAgo.addLocale(en)


export const TaskContent = ({x, setId, setTasks, tasks, handleUpdateTask, handleDeleteTask}: TaskProps) => {
    const isMountingRef = useRef(false);
    const timeAgo = new TimeAgo('en-US')

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        // isMountingRef.current && handleUpdateTask(x.id)
    }, [x.comments])

    return (
        <div key={x.id} className={`${styles.col} ${styles.task}`}
             id={x.id.toString()}
             onMouseEnter={() => setId(x.id)}>
            <div className={`${styles.row} ${styles.row_center} ${styles.all_margin_10_px}`}>
                <ReactStars value={x.difficulty} half={false} count={10}
                            onChange={(new_rating) => {
                                setTasks(tasks.map(task => task.id === x.id
                                    ? {...x, difficulty: new_rating}
                                    : task))
                            }}
                            color1={"var(--bg-color)"}
                            color2={"var(--link-color)"}/>
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
            </div>
            <div className={`${styles.row} ${styles.all_margin_10_px}`}>
                <p>id: <span
                    className={styles.tag}>{x.id}</span>&nbsp;&#x2022;&nbsp;added <span
                    className={styles.tag}>{timeAgo.format(x.createdAt)}</span>&nbsp;&#x2022;&nbsp;updated <span
                    className={styles.tag}>{timeAgo.format(x.updatedAt)}</span>&nbsp;&#x2022;&nbsp;
                    <span
                        className={styles.tag}>{x.attempts}</span> attempts
                </p>
                <p className={(x.status === "DRAFT") ? styles.draft : x.status === "IN_PROGRESS" ? styles.in_progress : x.status === "FAILED" ? styles.failed : styles.completed}>
                    {x.status}
                </p>
            </div>
            <div
                className={`${styles.col} ${styles.width_100} ${styles.all_margin_10_px}`}>
                <h1>Task <Copy
                    onClick={(e) => window.navigator.clipboard.writeText(x.task)}
                    size={14}/></h1>
                {x.completed ?
                    <p style={{whiteSpace: "pre-wrap"}}>{x.task}</p> :
                    <Field rows={14} value={x.task}
                           onUpdateHandler={(input) => {
                               setTasks(tasks.map(task => task.id === x.id
                                   ? {...x, task: input}
                                   : task))
                           }}
                           type={Type.Text} placeholder={"Task"}/>
                }
            </div>
            <div
                className={`${styles.col} ${styles.width_100} ${styles.all_margin_10_px}`}>
                <h1>Answer <Copy
                    onClick={(e) => window.navigator.clipboard.writeText(x.answer)}
                    size={14}/></h1>
                <Field rows={12} inputLength={0} value={x.answer}
                       onUpdateHandler={(input) => {
                           setTasks(tasks.map(task => task.id === x.id
                               ? {...x, answer: input}
                               : task))
                       }} disabled={x.completed} type={Type.Code}
                       placeholder={"Answer"}/>
            </div>
            <div
                className={`${styles.col} ${styles.width_100} ${styles.all_margin_10_px}`}>
                <h1>Comments <Copy
                    onClick={(e) => window.navigator.clipboard.writeText(x.comments)}
                    size={14}/></h1>
                {x.completed ?
                    <p style={{whiteSpace: "pre-wrap"}}>{x.comments}</p> :
                    <Field rows={10} inputLength={0} value={x.comments}
                           onUpdateHandler={(input) => {
                               setTasks(tasks.map(task => task.id === x.id
                                   ? {...x, comments: input}
                                   : task))
                           }}
                           type={Type.Text} placeholder={"Comments"}/>
                }
            </div>

            <div className={`${styles.row} ${styles.row_wrap}`}>
                <button onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteTask(x.id)
                }}>
                    Delete
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUpdateTask(x.id)
                }}>
                    Update
                </button>
            </div>
        </div>
    )
}