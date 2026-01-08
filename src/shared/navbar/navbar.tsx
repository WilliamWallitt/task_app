import styles from "./styles.module.css"
import {
    BarChart2, Clipboard,
    Code,
    Home,
    Info,
    Layers,
    LogIn,
    LogOut,
    Moon, Octagon,
    RefreshCcw, Server, Settings, Slack,
    Sun, Terminal,
    UserCheck,
    UserPlus
} from "react-feather";
import Clock from "~/shared/clock";
import {View} from "~/components/tasks";
import {useEffect, useState} from "react";
import {entireState, useAppDispatch, useAppSelector} from "~/redux/store";
import {action, UserWithImage} from "~/redux/state";
import {User} from "@prisma/client";
import { motion } from "framer-motion";
import {AdminTaskHintSettings} from "~/components/adminTaskHintSettings";

export enum THEME {
    LIGHT,
    DARK
}

interface NavbarProps {
    forceRefresh?: (() => void);
}



const Navbar = ({forceRefresh}: NavbarProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {user, theme, view, users} = state

    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [windowHeight, setWindowHeight] = useState<number>(0);

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const setTheme = (theme: THEME) => {
        dispatch(action({
            theme
        }))
    }

    const setView = (view: View) => {
        dispatch(action({
            view
        }))
    }

    useEffect(() => {
        const d = new Date()
        const hours = d.getHours()
        if (hours >= 18 || hours < 8) {
            updateTheme(THEME.DARK);
        } else {
            updateTheme(THEME.LIGHT);
        }

        window.addEventListener('storage', () => {
            const userStr = localStorage.getItem("user")
            if (userStr !== null && userStr !== "null") {
                const user = JSON.parse(userStr) as UserWithImage
                dispatch(action({
                    user: user,
                    users: users.map(u => u.id === user.id ? user : u)
                }))
            }
        })

        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, [])


    const updateTheme = (theme: THEME) => {
        const rootElement = document.documentElement;

        if (theme === THEME.LIGHT) {
            rootElement.style.setProperty('--bg-color', '#fff');
            rootElement.style.setProperty('--text-color', '#1a1a1a');
            rootElement.style.setProperty('--bg-color-light', '#f8f8f7');
            rootElement.style.setProperty('--selected-color', 'rgba(0, 0, 0, 0.03)')
            rootElement.style.setProperty('--bg-color-dark', '#f8fafc');
            rootElement.style.setProperty('--link-color', '#6e6e73');
        } else {
            rootElement.style.setProperty('--text-color', '#cdcdcd');
            rootElement.style.setProperty('--bg-color', '#0a192f');
            rootElement.style.setProperty('--bg-color-light', '#112240');
            rootElement.style.setProperty('--bg-color-dark', '#020c1b');
            rootElement.style.setProperty('--link-color', '#9b9b9b');
            // TODO
            rootElement.style.setProperty('--selected-color', 'transparent')
            // rootElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.81)');
            // rootElement.style.setProperty('--bg-color', '#191919');
            // rootElement.style.setProperty('--bg-color-light', '#202020');
            // rootElement.style.setProperty('--bg-color-dark', '#3F4448');
            // rootElement.style.setProperty('--link-color', 'rgb(225, 225, 225)');
        }
        setTheme(theme)
    }

    return (
        <div className={styles.navbar} style={{margin: 0}}>
            <div className={styles.navbar_container}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {staggerChildren: 0.1}
                        }
                    }}
                    className={styles.navbar_container_items}>
                    <motion.div
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0}
                        }}
                        transition={{duration: 0.1}}
                        className={`${styles.navbar_container_item}`}>

                        {windowWidth > 800 &&
                            <>
                                <Clock/>
                                &nbsp;&nbsp;
                            </>
                        }
                        {theme === THEME.DARK ?
                            <Sun style={{marginLeft: windowWidth > 800 ? "4px" : ""}} size={14}
                                 onClick={() => updateTheme(THEME.LIGHT)}/> :
                            <Moon style={{marginLeft: windowWidth > 800 ? "4px" : ""}} size={14}
                                  onClick={() => updateTheme(THEME.DARK)}/>
                        }
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0}
                        }}
                        transition={{duration: 0.1}}
                        onClick={() => setView(View.HOME)}
                        className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.HOME && styles.navbar_container_item_selected}`}>
                        <Home style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                        {windowWidth > 800 &&
                            <p>Home</p>
                        }
                    </motion.div>

                    {user !== null &&
                        <>
                            <motion.div
                                variants={{
                                    hidden: {opacity: 0, y: 20},
                                    visible: {opacity: 1, y: 0}
                                }}
                                transition={{duration: 0.1}}
                                onClick={() => setView(View.TASKS)}
                                className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.TASKS && styles.navbar_container_item_selected}`}>
                                <Layers style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                {windowWidth > 800 &&
                                    <p>Tasks</p>
                                }
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: {opacity: 0, y: 20},
                                    visible: {opacity: 1, y: 0}
                                }}
                                transition={{duration: 0.1}}
                                onClick={() => setView(View.HINT)}
                                className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.HINT && styles.navbar_container_item_selected}`}>
                                <Info style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                {windowWidth > 800 &&
                                    <p>Hints</p>
                                }
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: {opacity: 0, y: 20},
                                    visible: {opacity: 1, y: 0}
                                }}
                                transition={{duration: 0.1}}
                                onClick={() => setView(View.NOTES)}
                                className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.NOTES && styles.navbar_container_item_selected}`}>
                                <Clipboard style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                {windowWidth > 800 &&
                                    <p>Notes</p>
                                }
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: {opacity: 0, y: 20},
                                    visible: {opacity: 1, y: 0}
                                }}
                                transition={{duration: 0.1}}
                                onClick={() => setView(View.STATS)}
                                className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.STATS && styles.navbar_container_item_selected}`}>
                                <BarChart2 style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                {windowWidth > 800 &&
                                    <p>Performance</p>
                                }
                            </motion.div>
                            {user.role === "MASTER" &&
                                <motion.div
                                    variants={{
                                        hidden: {opacity: 0, y: 20},
                                        visible: {opacity: 1, y: 0}
                                    }}
                                    transition={{duration: 0.1}}
                                    onClick={() => setView(View.ADMIN)}
                                    className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.ADMIN && styles.navbar_container_item_selected}`}>
                                    <Code style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                    {windowWidth > 800 &&
                                        <p>Admin</p>
                                    }
                                </motion.div>
                            }
                            {user.role === "MASTER" &&
                                <motion.div
                                    variants={{
                                        hidden: {opacity: 0, y: 20},
                                        visible: {opacity: 1, y: 0}
                                    }}
                                    transition={{duration: 0.1}}
                                    onClick={() => setView(View.MISC)}
                                    className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.MISC && styles.navbar_container_item_selected}`}>
                                    <Terminal style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                    {windowWidth > 800 &&
                                        <p>Misc</p>
                                    }
                                </motion.div>
                            }

                            <motion.div
                                variants={{
                                    hidden: {opacity: 0, y: 20},
                                    visible: {opacity: 1, y: 0}
                                }}
                                transition={{duration: 0.1}}
                                onClick={() => setView(View.TEACHER)}
                                className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.TEACHER && styles.navbar_container_item_selected}`}>
                                <Slack style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                                {windowWidth > 800 &&
                                    <p>Teacher</p>
                                }
                            </motion.div>

                            <AdminTaskHintSettings windowWidth={windowWidth}/>
                        </>
                    }

                    {/*<hr style={{width: "100%", borderColor: "var(--text-color)"}}/>*/}
                    <br/>

                    {forceRefresh && <motion.div
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0}
                        }}
                        transition={{duration: 0.1}}
                        onClick={forceRefresh}
                        className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab}`}>
                        <RefreshCcw style={{marginRight: windowWidth > 800 ? "4px" : ""}}
                                    size={14}/>
                        {windowWidth > 800 &&
                            <p>Refresh</p>
                        }
                    </motion.div>}

                    {user &&
                        <motion.div
                            variants={{
                                hidden: {opacity: 0, y: 20},
                                visible: {opacity: 1, y: 0}
                            }}
                            transition={{duration: 0.1}}
                            onClick={() => {
                                localStorage.removeItem("user")
                                dispatch(action({user: null, view: View.LOGIN_SIGNUP}))
                            }}
                            className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.LOGIN_SIGNUP && styles.navbar_container_item_selected}`}>
                            <LogOut style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                            {windowWidth > 800 &&
                                <p>Sign Out</p>
                            }
                        </motion.div>
                    }

                    {!user &&
                        <motion.div
                            variants={{
                                hidden: {opacity: 0, y: 20},
                                visible: {opacity: 1, y: 0}
                            }}
                            transition={{duration: 0.1}}
                            onClick={() => setView(View.LOGIN_SIGNUP)}
                            className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.LOGIN_SIGNUP && styles.navbar_container_item_selected}`}>
                            <LogIn style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                            {windowWidth > 800 &&
                                <p>Sign In</p>
                            }
                        </motion.div>
                    }

                    {user &&
                        <motion.div
                            variants={{
                                hidden: {opacity: 0, y: 20},
                                visible: {opacity: 1, y: 0}
                            }}
                            transition={{duration: 0.1}}
                            onClick={() => setView(View.USER_EDIT)}
                            className={`${styles.navbar_container_item} ${styles.navbar_container_item_tab} ${view === View.USER_EDIT && styles.navbar_container_item_selected}`}>
                            <UserCheck style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                            {windowWidth > 800 &&
                                <p>{user.name.split(" ").map(x => x[0]).join("")}</p>
                            }
                        </motion.div>
                    }
                </motion.div>
            </div>
        </div>
    )
}
export default Navbar
