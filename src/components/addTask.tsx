import React, {useState} from "react";
import styles from "~/pages/index.module.css";
import {Send} from "react-feather";
import {action} from "~/redux/state";
import {Task} from "~/components/tasks";
import {api} from "~/utils/api";
import {entireStateUser, useAppDispatch, useAppSelector} from "~/redux/store";

interface AddTaskProps {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
}

export const AddTask = ({tasks, setTasks}: AddTaskProps) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(entireStateUser)

    const addTaskMutation = api.task.add.useMutation()

    const [input, setInput] = useState<string>("")

    const handleAddTask = () => {
        // Trigger the mutation to add a new task
        // trpc.add.mutate(input)
        if (user) {
            addTaskMutation.mutate({
                task: input,
                userIds: [user.id]
            }, {
                onSuccess: (task) => {
                    if (task) {
                        setTasks([task as Task, ...tasks])
                    }
                    setInput("")
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

    return (
        <div style={{justifyContent: "center", alignItems: "center"}}
             className={`${styles.col} ${styles.width_100} ${styles.padding_10px}`}>
                                <textarea rows={6} placeholder={"Add a new Task"} value={input}
                                          onChange={(e) => setInput(e.target.value)}/>
            <button onClick={() => handleAddTask()}>
                <p>Add</p>
                <Send size={14}/>
            </button>
        </div>

    )

}