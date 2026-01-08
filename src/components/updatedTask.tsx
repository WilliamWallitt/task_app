import { Task } from "@prisma/client";
import React from "react"
import { useState, useEffect } from "react";
import {api} from "~/utils/api";
import styles from "~/pages/index.module.css";
import tasksStyles from "~/pages/index.module.css";
import TimeAgo from "javascript-time-ago";
import { motion } from "framer-motion";


const UpdatedTasksChecker = ({ userId }: { userId: number }) => {

    const timeAgo = new TimeAgo('en-US')

    const [updatedTasks, setUpdatedTasks] = useState<Task[]>([]);

    const checkIfTasksUpdatedQuery = api.user.checkIfTasksUpdated.useQuery({ userId });

    const checkForUpdates = async () => {
        const response = await checkIfTasksUpdatedQuery.refetch()
        const data = response.data
        try {
            if (data && data.length > 0) {
                setUpdatedTasks(data);
            }
        } catch (error) {
            console.error("Error fetching updated tasks:", error);
        }
    };

    useEffect(() => {
        // Initial check
        checkForUpdates();

        // Set interval to check every 1 minute
        // 60 * 1000
        const interval = setInterval(checkForUpdates, 60 * 1000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [userId]);

    const renderStatusColor = (task: Task) => {
        switch (task.status) {
            case "IN_PROGRESS":
                return tasksStyles.in_progress;
            case "COMPLETED":
                return tasksStyles.completed;
            case "DRAFT":
                return tasksStyles.draft;
            case "FAILED":
                return tasksStyles.failed;
        }
    }

    const renderStatus = (task: Task) => (
        <div className={styles.col}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }
                    }
                }}
                className={`${styles.row} ${styles.padding_10px}`} style={{alignItems: "center", paddingBottom: "unset"}}>
                <motion.p
                    style={{lineHeight: "26px"}}
                    variants={{
                        hidden: {opacity: 0, y: 20},
                        visible: {opacity: 1, y: 0}
                    }}
                    transition={{duration: 0.4}}
                    // className={`${renderStatusColor(task)}`}
                >
                    id: <span className={styles.tag}>{task.id}</span>&nbsp;&#x2022;&nbsp;<span
                    className={styles.tag}>{task.task.slice(0, 120) + "..."}</span>
                    has been <span className={`${tasksStyles.tag} ${renderStatusColor(task)}`}>{"UPDATED"}</span>
                    &nbsp;&#x2022;&nbsp;<span className={tasksStyles.tag}>{timeAgo.format(task.updatedAt)}</span>
            </motion.p>
            </motion.div>
        </div>
    )

    if (updatedTasks.length === 0) {
        return <></>
    }

    return (
        <div style={{justifyContent: "center"}}
             className={`${styles.row} ${styles.row_center}`}>
            {updatedTasks[0] && renderStatus(updatedTasks[0])}
        </div>

    );
};

export default UpdatedTasksChecker;
