import styles from "../pages/index.module.css";
import React, {useEffect, useState} from "react";
import {
    Hint as PrismaHint,
    Hint_Bullet,
    HintUser,
    Image as PrismaImage,
    Task as PrismaTask,
    TaskUser,
    User,
    Comment,
    UserDevice
} from "@prisma/client";
import {Hints} from "~/components/hints";
import {WeatherForcast} from "~/components/weatherForcast";
import {TasksBarChart} from "~/components/tasksBarChart";
import {TaskContent} from "~/components/task";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {entireState, useAppDispatch, useAppSelector} from "~/redux/store";
import {AdminUsers} from "~/components/adminUsers";
import {Notes} from "~/components/notes";
import {AddTask} from "~/components/addTask";
import {SearchTasks} from "~/components/searchTasks";
import 'reactjs-popup/dist/index.css';
import {AdminTaskHintSettings} from "~/components/adminTaskHintSettings";
import {TasksRadialChart} from "~/components/tasksRadialChart";
import {AdminImages} from "~/components/adminImages";
import {AnimatePresence, motion} from "framer-motion";
import {AnimatedContent, AnimatedContentType} from "~/components/animatedContent";
import {UserLoginSignup} from "~/components/userLoginSignup";
import UpdatedTask from "~/components/updatedTask";
import {action} from "~/redux/state";
import InfiniteScroll from "react-infinite-scroll-component";
import {Loader} from "react-feather";
import {Teacher} from "~/components/teacher";

// Define allowed status values
export const Status = {
    DRAFT: 'DRAFT',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
} as const;

// Create a union type from the Status object
export type StatusType = typeof Status[keyof typeof Status];

interface WithTaskUsers {
    users: TaskUser[]
}

interface WithComments {
    Comment: Comment[]
}

interface WithHintUsers {
    users: HintUser[]
}

export type Task = Omit<PrismaTask, 'status'> & { status: StatusType } & WithTaskUsers & WithComments;

export interface BaseHint extends PrismaHint {
    bullets: Hint_Bullet[]
}

export type Hint = BaseHint & WithHintUsers

export type Image = Omit<PrismaImage, "image"> & {image: string | undefined}

export interface Status {
    action: "ADDED" | "DELETED" | "UPDATED",
    task: Task,
    field: keyof Task
}


export enum View {
    HOME,
    TASKS,
    HINT,
    STATS,
    NOTES,
    MISC,
    ADMIN,
    LOGIN_SIGNUP,
    USER_EDIT,
    TEACHER
}

export enum AdminView {
    TASKS,
    HINTS,
    USERS,
    IMAGES
}

TimeAgo.addLocale(en)

interface TasksProps {

}

export default function Tasks({}: TasksProps) {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {view, status, taskData, hintData, user, adminView} = state

    // const timeAgo = new TimeAgo('en-US')

    const [tasks, setTasks] = useState<Task[]>(taskData)
    const [id, setId] = useState<number | undefined>(undefined)
    const [graphFilter, setGraphFilter] = useState<StatusType | "ALL">("ALL")
    const [hints, setHints] = useState<Hint[]>(hintData)

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

    useEffect(() => {
        setTasks(taskData)
    }, [taskData]);

    useEffect(() => {
        setHints(hintData)
    }, [hintData]);


    useEffect(() => {
        handleClickScroll(id?.toString())
    }, [tasks]);


    // // testing
    //
    // const [visibleTasks, setVisibleTasks] = useState(tasks.slice(0, 9)); // Load first 9
    // const [hasMore, setHasMore] = useState(tasks.length > 9);
    //
    // useEffect(() => {
    //     setVisibleTasks(tasks.slice(0, 9))
    //     setHasMore(tasks.length > 9)
    // }, [tasks]);
    //
    // const loadMoreTasks = () => {
    //     const nextTasks = tasks.slice(visibleTasks.length, visibleTasks.length + 9);
    //     setVisibleTasks((prev) => [...prev, ...nextTasks]);
    //     if (visibleTasks.length + 9 >= tasks.length) setHasMore(false);
    // };
    //
    // // end

    const renderView = (view: View) => {
        switch (view) {
            case View.MISC:
                return (
                    <div className={styles.main}>
                        <WeatherForcast/>
                    </div>
                );
            case View.HOME:
                return <></>;
            case View.TASKS:
                return (
                    <>
                        <main className={`${styles.main}`}>
                            <div className={`${styles.col} ${styles.width_100}`}>

                                {user && <UpdatedTask userId={user.id}/>}

                                <div className={`${styles.row} ${styles.task_row} ${styles.width_100}`}>

                                    <div className={`${styles.col} ${styles.width_100}`}>

                                        <SearchTasks setTasks={setTasks} tasks={tasks}
                                                     isAdmin={false}/>

                                        {/*TODO - keep this for now */}
                                        {/*<motion.div*/}
                                        {/*    initial="hidden"*/}
                                        {/*    animate="visible"*/}
                                        {/*    variants={{*/}
                                        {/*        hidden: { opacity: 0 },*/}
                                        {/*        visible: {*/}
                                        {/*            opacity: 1,*/}
                                        {/*            transition: { staggerChildren: 0.1 }*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    className={`${styles.row} ${styles.row_wrap}`}*/}
                                        {/*>*/}
                                        {/*    {(tasks && tasks.length > 0 && tasks.map(x => (*/}
                                        {/*        <TaskContent hints={hints} isAdmin={false} key={x.id} setId={setId}*/}
                                        {/*                     x={x} tasks={tasks} setTasks={setTasks}/>*/}
                                        {/*    )))}*/}
                                        {/*</motion.div>*/}


                                        <div
                                            className={`${styles.row} ${styles.row_wrap}`}
                                        >
                                            {tasks.filter(x => !x.archived || user?.role === "MASTER").map((x) => (
                                                <TaskContent
                                                    key={x.id}
                                                    x={x}
                                                    hints={hints}
                                                    isAdmin={false}
                                                    setId={setId}
                                                    tasks={tasks}
                                                    setTasks={setTasks}
                                                />
                                            ))}
                                            {/*<InfiniteScroll*/}
                                            {/*    dataLength={visibleTasks.length}*/}
                                            {/*    next={loadMoreTasks}*/}
                                            {/*    hasMore={hasMore}*/}
                                            {/*    loader={<p className="text-center p-4">Loading more tasks...</p>}*/}
                                            {/*    className={`${styles.row} ${styles.row_wrap}`}*/}
                                            {/*>*/}
                                            {/*    {visibleTasks.map((x) => (*/}
                                            {/*        <TaskContent*/}
                                            {/*            key={x.id}*/}
                                            {/*            x={x}*/}
                                            {/*            hints={hints}*/}
                                            {/*            isAdmin={false}*/}
                                            {/*            setId={setId}*/}
                                            {/*            tasks={tasks}*/}
                                            {/*            setTasks={setTasks}*/}
                                            {/*        />*/}
                                            {/*    ))}*/}
                                            {/*</InfiniteScroll>*/}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </main>
                    </>
                );
            case View.HINT:
                return (
                    <div className={styles.main}>
                    <Hints hints={hints} isAdmin={false}/>
                </div>
            );
            case View.STATS:
            return (
                <div className={styles.main}>
                    <div className={`${styles.row} ${styles.row_center}`}
                         style={{justifyContent: "center"}}>
                        <p className={`${styles.margin_10px}`}><strong className="clickable"
                                                                                          onClick={() => setGraphFilter("ALL")}>{tasks.length}</strong> Tasks&nbsp;&#x2022;&nbsp;
                                <strong className="clickable"
                                        onClick={() => setGraphFilter("COMPLETED")}>{tasks.filter(x => x.status === "COMPLETED").length}</strong> completed&nbsp;&#x2022;&nbsp;
                                <strong className="clickable"
                                        onClick={() => setGraphFilter("IN_PROGRESS")}>{tasks.filter(x => x.status === "IN_PROGRESS").length}</strong> in
                                progress&nbsp;&#x2022;&nbsp;<strong className="clickable"
                                                                    onClick={() => setGraphFilter("DRAFT")}>{tasks.filter(x => x.status === "DRAFT").length}</strong> pending&nbsp;&#x2022;&nbsp;<strong className="clickable"
                                                            onClick={() => setGraphFilter("FAILED")}>{tasks.filter(x => x.status === "FAILED").length}</strong> failed
                            </p>
                        </div>

                        <TasksBarChart graphFilter={graphFilter} tasks={tasks}/>

                        <TasksRadialChart tasks={tasks}/>
                    </div>
                );
            case View.NOTES:
                return <Notes/>;
            case View.TEACHER:
                return <Teacher tasks={tasks} setTasks={(prevTasks) => setTasks(prevTasks)}/>
            case View.ADMIN:
                return (
                    <div className={styles.main}>

                        <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                            <div style={{justifyContent: "center", alignItems: "center"}}
                                 className={`${styles.row} ${styles.width_100} ${styles.padding_10px}`}>
                                {Object.entries(AdminView).filter(([k, v]) => isNaN(parseInt(k))).map(([k, v]) => (
                                    <button onClick={() => (dispatch(action({adminView: v as AdminView})))} className={`${(adminView === v) && styles.selected}`}>
                                        <p>{k[0] + k.slice(1, k.length).toLowerCase()}</p>
                                    </button>
                                ))}
                            </div>
                        </AnimatedContent>

                        {adminView === AdminView.USERS &&
                            <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                                <AdminUsers/>
                            </AnimatedContent>
                        }
                        {adminView === AdminView.IMAGES &&
                            <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                                <AdminImages/>
                            </AnimatedContent>
                        }
                        {adminView === AdminView.TASKS &&
                            <>
                                <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                                    <AddTask tasks={tasks} setTasks={(prevTasks) => setTasks(prevTasks)}/>

                                    <SearchTasks setTasks={setTasks} tasks={tasks} isAdmin={true}/>
                                    <div
                                        className={`${styles.row} ${styles.row_wrap}`}
                                    >
                                        {tasks.map((x) => (
                                            <TaskContent
                                                key={x.id}
                                                x={x}
                                                hints={hints}
                                                isAdmin={true}
                                                setId={setId}
                                                tasks={tasks}
                                                setTasks={setTasks}
                                            />
                                        ))}
                                        {/*<InfiniteScroll*/}
                                        {/*    dataLength={visibleTasks.length}*/}
                                        {/*    next={loadMoreTasks}*/}
                                        {/*    hasMore={hasMore}*/}
                                        {/*    loader={<p className="text-center p-4">Loading more tasks...</p>}*/}
                                        {/*    className={`${styles.row} ${styles.row_wrap}`}*/}
                                        {/*>*/}
                                        {/*    {visibleTasks.map((x) => (*/}
                                        {/*        <TaskContent*/}
                                        {/*            key={x.id}*/}
                                        {/*            x={x}*/}
                                        {/*            hints={hints}*/}
                                        {/*            isAdmin={true}*/}
                                        {/*            setId={setId}*/}
                                        {/*            tasks={tasks}*/}
                                        {/*            setTasks={setTasks}*/}
                                        {/*        />*/}
                                        {/*    ))}*/}
                                        {/*</InfiniteScroll>*/}
                                    </div>

                                </AnimatedContent>

                            </>
                        }
                        {adminView == AdminView.HINTS &&
                            <>
                                <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                                    <div style={{justifyContent: "center", alignItems: "center"}}
                                         className={`${styles.col} ${styles.width_100} ${styles.padding_10px}`}>
                                        <Hints hints={hints} isAdmin={true}/>
                                    </div>
                                </AnimatedContent>
                            </>
                        }
                    </div>
                );
            case View.LOGIN_SIGNUP:
                return <></>;

        }
    }

    return (
        <>
            <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                {taskData.length === 0 ?
                    <div style={{height: "80vh"}}
                         className={`${styles.row_col_center_width_100_height_100}`}>
                        <Loader className={styles.loading_icon} size={14}/>
                    </div> : renderView(view)
                }
            </AnimatedContent>
        </>
    )
}
