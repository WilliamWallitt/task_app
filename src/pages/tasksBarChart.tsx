import React from "react";
import styles from "~/pages/index.module.css";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {StatusType, Task} from "~/pages/tasks";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export interface TasksBarChartProps {
    tasks: Task[],
    graphFilter: StatusType | "ALL"
}

TimeAgo.addLocale(en)


export const TasksBarChart = ({tasks, graphFilter}: TasksBarChartProps) => {
    const timeAgo = new TimeAgo('en-US')

    const CustomTooltip = (props: any) => {
        const {active, payload, label, contentStyle} = props

        if (active && payload && payload.length) {
            const task = tasks.find(x => x.id === payload[0].payload.id)
            if (!task) {
                return null
            }
            return (
                <div className="custom-tooltip" style={{...contentStyle}}>
                    <div className={`${styles.row} ${styles.all_margin_10_px}`}>
                        <p>id: <span
                            className={styles.tag}>{task.id}</span>&nbsp;&#x2022;&nbsp;added <span
                            className={styles.tag}>{timeAgo.format(task.createdAt)}</span>&nbsp;&#x2022;&nbsp;updated <span
                            className={styles.tag}>{timeAgo.format(task.updatedAt)}</span>&nbsp;&#x2022;&nbsp;
                            <span
                                className={styles.tag}>{task.attempts}</span> attempts
                        </p>
                        <p className={task.status === "DRAFT" ? styles.draft : task.status === "IN_PROGRESS" ? styles.in_progress : task.status === "FAILED" ? styles.failed : styles.completed}>
                            {task.status}
                        </p>
                    </div>
                    <p>Task</p>
                    <p className="intro"><strong>{task?.task}</strong></p>
                    <p>Answer</p>
                    <p className="desc"><strong>{task.answer}</strong></p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={`${styles.row} ${styles.row_center}`}>
            <ResponsiveContainer width={"90%"} height={window.innerWidth < 1000 ? 250 : 400}>
                <BarChart data={tasks.filter(x => x.difficulty !== 0).map(x => ({
                    id: x.id,
                    createdAt: x.createdAt.toDateString(),
                    [x.status]: x.difficulty,
                    ALL: x.difficulty
                })).sort((a, b) => (a.id > b.id ? 1 : -1))}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={"createdAt"}/>
                    <YAxis/>
                    <Legend align={"center"}/>
                    <Tooltip content={<CustomTooltip/>} contentStyle={{
                        border: "none",
                        background: "var(--bg-color-light)",
                        borderRadius: "8px",
                        padding: "2px 4px"
                    }}/>
                    <Bar radius={4} dataKey={graphFilter} fill="var(--text-color)"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}