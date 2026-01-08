import React from "react";
import styles from "~/pages/index.module.css";
import {Bar, BarChart, Brush, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {StatusType, Task} from "~/components/tasks";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {Field, Type} from "~/components/field";

export interface TasksBarChartProps {
    tasks: Task[],
    graphFilter: StatusType | "ALL"
}

TimeAgo.addLocale(en)


type payloadType = {payload: {id: number}}

export const TasksBarChart = ({tasks, graphFilter}: TasksBarChartProps) => {
    const timeAgo = new TimeAgo('en-US')
    const CustomTooltip = (props: any) => {
        const {active, payload, label, contentStyle} = props
        // this is to get round es-lint rules - for prod build
        const p = payload as payloadType[]

        if (active && p?.length) {
            const task = tasks.find(x => x.id === p[0]?.payload.id)
            if (!task) {
                return null
            }
            return (
                <div className="custom-tooltip" style={{...contentStyle}}>
                    <div className={`${styles.row} ${styles.all_margin_10_px} ${styles.row_center}`}>
                        <p className={`${task.status === "DRAFT" ? styles.draft : task.status === "IN_PROGRESS" ? styles.in_progress : task.status === "FAILED" ? styles.failed : styles.completed} ${styles.small_text}`}>
                            {task.status}
                        </p>
                        <p>id: <span
                            className={styles.tag}>{task.id}</span>&nbsp;&#x2022;&nbsp;added <span
                            className={styles.tag}>{timeAgo.format(task.createdAt)}</span>&nbsp;&#x2022;&nbsp;updated <span
                            className={styles.tag}>{timeAgo.format(task.updatedAt)}</span>&nbsp;&#x2022;&nbsp;
                            <span
                                className={styles.tag}>{task.attempts}</span> attempts
                        </p>
                    </div>
                    <h1>Task</h1>
                    <Field onUpdateHandler={() => {}} type={Type.Code} placeholder={task?.task}/>
                    {task?.answer &&
                        <>
                            <h1>Answer</h1>
                            <Field onUpdateHandler={() => {
                            }} type={Type.Code} placeholder={task?.answer}/>
                        </>
                    }
                </div>
            );
        }

        return null;
    };

    return (
        <div className={`${styles.row} ${styles.row_center}`} style={{height: "80vh"}}>
            {/*window.innerWidth < 1000 ? 250 : 700*/}
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                    margin={{top: 0, bottom: 0, left: 0, right: 0}}
                    layout={"horizontal"}
                    // layout={window.innerWidth < 1000 ? "vertical" : "horizontal"}
                    data={tasks.filter(x => x.difficulty !== 0).map(x => ({
                    id: x.id,
                    createdAt: x.createdAt.toDateString(),
                    [x.status]: x.difficulty,
                    ALL: x.difficulty
                })).sort((a, b) => (a.id > b.id ? 1 : -1))}>
                    {/*{window.innerWidth < 1000 ?*/}
                    {/*    <>*/}
                    {/*        <XAxis type={"number"}/>*/}
                    {/*        <YAxis type={"category"} dataKey={"createdAt"}/>*/}
                    {/*    </> :*/}
                    {/*    <>*/}
                    {/*        <XAxis type={"category"} dataKey={"createdAt"}/>*/}
                    {/*        <YAxis type={"number"}/>*/}
                    {/*    </>*/}
                    {/*}*/}
                    <XAxis type={"category"} dataKey={"createdAt"}/>
                    <YAxis type={"number"}/>
                    <XAxis type={"category"} dataKey={"createdAt"}/>
                    <YAxis type={"number"}/>
                    <Legend verticalAlign="top" height={36}/>
                    <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip/>} contentStyle={{
                        border: "none",
                        background: "var(--bg-color)",
                        borderRadius: "8px",
                        padding: "2px 16px",
                        marginRight: "12px"
                    }}/>
                    <Bar radius={8} dataKey={graphFilter} fill="var(--link-color)"/>
                    <Brush dataKey="createdAt" height={30} stroke="var(--text-color)" fill={"var(--bg-color-dark)"} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}