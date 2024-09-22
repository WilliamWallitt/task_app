import styles from "./styles.module.css"
import tasksStyles from "../../pages/index.module.css"
import {FileText, Layers, Moon, Sun} from "react-feather";
import Clock from "~/shared/clock";
import {Task, View} from "~/pages/tasks";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {useEffect} from "react";

export enum THEME {
    LIGHT,
    DARK
}

export interface Status {
    action: "ADDED" | "DELETED" | "UPDATED",
    task: Task,
    field: keyof Task
}

interface NavbarProps {
    setTheme: (theme: THEME) => void;
    theme: THEME;
    status: Status | null;
    setView: (view: View) => void;
}

TimeAgo.addLocale(en)


const Navbar = ({setTheme, theme, status, setView}: NavbarProps) => {
    const timeAgo = new TimeAgo('en-US')

    useEffect(() => {
        const d = new Date()
        const hours = d.getHours()
        if (hours >= 18) {
            updateTheme(THEME.DARK);
        } else {
            updateTheme(THEME.LIGHT);
        }
    }, [])

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
    const renderStatus = () => (
        status &&
        <>
            <p style={{maxWidth: "35vw"}} className={`${renderStatusColor(status.task)} ${styles.navbar_container_item_text}`}>
                id: {status.task.id} | {status.task.task}
            </p>
            <p className={styles.navbar_container_item_text}>&nbsp;has been <span className={tasksStyles.tag}>{status.action}</span></p>
            &nbsp;&#x2022;&nbsp;
            <p className={styles.navbar_container_item_text}>{timeAgo.format(status.task.updatedAt)}</p>
        </>
    )

    const updateTheme = (theme: THEME) => {
        const rootElement = document.documentElement;

        if (theme === THEME.LIGHT) {
            rootElement.style.setProperty('--bg-color', '#f1f3fb');
            rootElement.style.setProperty('--text-color', '#6e6e73');
            rootElement.style.setProperty('--bg-color-light', '#fff');
            rootElement.style.setProperty('--bg-color-dark', '#f1f3fb');
            rootElement.style.setProperty('--link-color', '#1d1d1f');
        } else {
            rootElement.style.setProperty('--text-color', '#e6f1ff');
            rootElement.style.setProperty('--bg-color', '#0a192f');
            rootElement.style.setProperty('--bg-color-light', '#112240');
            rootElement.style.setProperty('--bg-color-dark', '#020c1b');
            rootElement.style.setProperty('--link-color', '#64ffda');
        }
        setTheme(theme)
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_container}>
                <div className={styles.navbar_container_items}>
                    <div className={styles.navbar_container_item}>
                        <Clock/>
                    </div>
                    <div onClick={() => setView(View.TASKS)} className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab}`}>
                        <p>Tasks</p>
                        <Layers style={{marginLeft: "4px"}} size={14}/>
                    </div>
                    <div onClick={() => setView(View.FILE)} className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab}`}>
                        <p>Tutorial</p>
                        <FileText style={{marginLeft: "4px"}} size={14}/>
                    </div>
                    {renderStatus()}
                </div>
                <div className={styles.navbar_container_items} style={{overflow: "unset"}}>
                    {theme === THEME.DARK ?
                        <Sun size={14} onClick={() => updateTheme(THEME.LIGHT)}/> :
                            <Moon size={14} onClick={() => updateTheme(THEME.DARK)}/>
                        }
                    </div>
                </div>
            </div>
            )
}
export default Navbar