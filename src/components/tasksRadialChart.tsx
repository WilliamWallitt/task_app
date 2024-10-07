import React, {useState} from "react";
import {Task} from "~/components/tasks";
import {Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import styles from "~/pages/index.module.css";
import {TasksDifficultyBarChart} from "~/components/tasksDifficultyBarChart";

interface TasksRadialChartProps {
    tasks: Task[],
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"var(--text-color)"}>
                {(payload as {name: string}).name}
            </text>
            <Sector opacity={0.8}
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"var(--text-color)"} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={"var(--text-color)"} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--text-color)">{`${value} Tasks`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        </g>
    );
};


export const TasksRadialChart = ({tasks}: TasksRadialChartProps) => {

    const data = Object.entries(tasks.map(x => ({
        [x.status]: 1
    })).reduce((a, c) => {

        const key = Object.keys(c)[0]

        if (key && key.length > 0 && key in a) {
            const value = a[key] ?? 0
            return {...a, [key]: value + 1}
        }
        return {...c, ...a}
    }, {})).map(([k, v]) => ({
        name: k,
        value: v,
        // fill: k === "IN_PROGRESS" ? "#F1C21B" : k === "DRAFT" ? "rgb(218, 30, 40)" : "#00f7a1"
    }));

    const [activeIndex, setActiveIndex] = useState<number>(0)


    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    };


    return (
        <div className={`${styles.row}`}>
            <TasksDifficultyBarChart tasks={tasks}/>

            <ResponsiveContainer width={"95%"} height={window.innerWidth < 1000 ? 300 : 500}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        opacity={0.8}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={"30%"}
                        outerRadius={"50%"}
                        fill="var(--text-color)"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}