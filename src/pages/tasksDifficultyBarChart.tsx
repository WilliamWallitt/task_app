import React from "react";
import {Task} from "~/pages/tasks";
import {
    Bar,
    BarChart, Brush, CartesianGrid, Legend,
    ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export interface TasksDifficultyBarChartProps {
    tasks: Task[],
}

export const TasksDifficultyBarChart = ({tasks}: TasksDifficultyBarChartProps) => {

    const renderData = () => {
        const d = Object.entries(tasks.reduce((acc, task) => {
            const difficulty = task.difficulty;
            if (acc[difficulty]) {
                acc[difficulty] += 1;
            } else {
                acc[difficulty] = 1;
            }
            return acc;
        }, {} as Record<number, number>)).map(([k, v]) => ({count: k, difficulty: v}))
        console.log(d)
        return d
    }

    return (
        <>
            <ResponsiveContainer width={"95%"} height={window.innerWidth < 1000 ? 300 : 500}>
                <BarChart width={150} height={40} data={renderData()}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={"count"}/>
                    <YAxis dataKey={"difficulty"}/>
                    <Bar dataKey={"difficulty"} radius={4} fill="var(--text-color)" />
                    <Legend align={"center"}/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )

}