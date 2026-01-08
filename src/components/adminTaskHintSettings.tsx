import React, {useEffect, useState} from "react";
import styles from "~/pages/index.module.css";
import navbarStyles from "~/shared/navbar/styles.module.css";
import {AlertTriangle, Clipboard, Cpu, Home, Info, Layers, MessageCircle, Settings} from "react-feather";
import {api} from "~/utils/api";
import {entireStateUser, entireStateUsers, useAppDispatch, useAppSelector} from "~/redux/store";
import {Hint, Task, View} from "~/components/tasks";
import {action, entireState} from "~/redux/state";
import Popup from "reactjs-popup";
import {Popup as PopupComponent} from "~/components/popup"
import {motion} from "framer-motion";
import TimeAgo from "javascript-time-ago";

interface AdminTaskHintSettingsProps {
    windowWidth: number
}

enum SettingsView {
    Tasks,
    Hints,
    Comments,
    Notes,
    Devices
}


export const AdminTaskHintSettings = ({windowWidth}: AdminTaskHintSettingsProps) => {
    const timeAgo = new TimeAgo('en-US')

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {taskData, hintData, showSettingPopup} = state

    const users = useAppSelector(entireStateUsers)
    const user = useAppSelector(entireStateUser)

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [settingsView, setSettingsView] = useState<SettingsView>(SettingsView.Tasks)

    const deleteAllTasksMutation = api.task.deleteAll.useMutation()
    const deleteAllHintsMutation = api.hint.deleteAll.useMutation()

    const assignUserToAllTasksMutation = api.task.assignUserToAll.useMutation()
    const unAssignUserToAllTasksMutation = api.task.unAssignUserToAll.useMutation()

    const archiveAllQuery = api.task.archiveAll.useMutation()
    const restoreAllQuery = api.task.restoreAll.useMutation()

    const assignUserToAllHintsMutation = api.hint.assignUserToAll.useMutation()
    const unAssignUserToAllHintsMutation = api.hint.unAssignUserToAll.useMutation()

    const deleteAllUserTasksMutation = api.task.deleteAllForUser.useMutation()

    const deleteAllNotesMutation = api.note.deleteAll.useMutation()

    const migrateMutation = api.task.migrateComments.useMutation()

    useEffect(() => {
        setSelectedUserId(user?.id ?? null)
    }, [])

    const handleDeleteAllTasks = () => {
        deleteAllTasksMutation.mutate(undefined, {
            onSuccess: (data) => {
                dispatch(action({
                    taskData: []
                }))
            },
            onError: (err) => {
                alert(err)
            }
        })
    }


    const handleDeleteAllHints = () => {
        deleteAllHintsMutation.mutate(undefined, {
            onSuccess: (data) => {
                dispatch(action({
                    hintData: []
                }))
            },
            onError: (err) => {
                alert(err)
            }
        })
    }

    const renderDevices = () => {
        if (!user || !user.devices || user.devices.length === 0) {
            return <p>No devices found.</p>
        }

        const device = user.devices[0]
        if (!device) {
            return <p>No devices found.</p>
        }


        return (
            <div className={`${styles.col} ${styles.width_100}`}>
                <div className={`${styles.row}`} style={{justifyContent: "space-between"}}>
                    <div className={`${styles.col}`}>
                        <p className={`${styles.tag} ${styles.small_text}`}>Device Name</p>
                        <p>{device.device}</p>
                    </div>
                    <div className={`${styles.col}`}>
                        <p className={`${styles.tag} ${styles.small_text}`}>Last Active</p>
                        <p>{timeAgo.format(new Date(device.lastAccess))}</p>
                    </div>
                    <div className={`${styles.col}`}>
                        <p className={`${styles.tag} ${styles.small_text}`}>Location</p>
                        <p>{device.location}</p>
                    </div>
                </div>
            </div>
        )
    }

    const renderAssignUserToAll = () => {

        return (
            <>
                <motion.div
                    variants={{
                        hidden: {opacity: 0, y: 20},
                        visible: {opacity: 1, y: 0}
                    }}
                    transition={{duration: 0.4}}
                    onClick={() => {
                        dispatch(action({showSettingPopup: true}))
                    }}
                    className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${showSettingPopup && navbarStyles.navbar_container_item_selected}`}>
                    <Settings style={{marginRight: windowWidth > 800 ? "4px" : ""}} size={14}/>
                    {windowWidth > 800 &&
                        <p>Settings</p>
                    }
                </motion.div>

                {showSettingPopup && <PopupComponent onClose={(bool) => dispatch(action({showSettingPopup: bool}))} children={
                    <div className={styles.popup_nav_children_container} style={{margin: 0}}>
                        <div className={`${styles.popup_navbar}`} style={{margin: 0}}>
                            <div className={navbarStyles.navbar_container} style={{margin: 0}}>
                                <div className={navbarStyles.navbar_container_items} style={{width: "90%"}}>
                                    <br/>
                                    <div onClick={() => {
                                        setSettingsView(SettingsView.Tasks)
                                    }}
                                         className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${settingsView === SettingsView.Tasks && navbarStyles.navbar_container_item_selected}`}>
                                        <Layers style={{marginRight: "4px"}} size={14}/>
                                        <p>Tasks</p>
                                    </div>
                                    {user?.role === 'MASTER' &&
                                        <>
                                            <div onClick={() => {
                                                setSettingsView(SettingsView.Hints)
                                            }}
                                                 className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${navbarStyles.navbar_container_item_tab} ${settingsView === SettingsView.Hints && navbarStyles.navbar_container_item_selected}`}>
                                                <Info style={{marginRight: "4px"}} size={14}/>
                                                <p>Hints</p>
                                            </div>

                                            <div onClick={() => {
                                                setSettingsView(SettingsView.Comments)
                                            }}
                                                 className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${navbarStyles.navbar_container_item_tab} ${settingsView === SettingsView.Comments && navbarStyles.navbar_container_item_selected}`}>
                                                <MessageCircle style={{marginRight: "4px"}} size={14}/>
                                                <p>Comments</p>
                                            </div>
                                        </>
                                    }

                                    <div onClick={() => {
                                        setSettingsView(SettingsView.Notes)
                                    }}
                                         className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${navbarStyles.navbar_container_item_tab} ${settingsView === SettingsView.Notes && navbarStyles.navbar_container_item_selected}`}>
                                        <Clipboard style={{marginRight: "4px"}} size={14}/>
                                        <p>Notes</p>
                                    </div>

                                    <div onClick={() => {
                                        setSettingsView(SettingsView.Devices)
                                    }}
                                         className={`${navbarStyles.navbar_container_item} ${navbarStyles.navbar_container_item_tab} ${navbarStyles.navbar_container_item_tab} ${settingsView === SettingsView.Devices && navbarStyles.navbar_container_item_selected}`}>
                                        <Cpu style={{marginRight: "4px"}} size={14}/>
                                        <p>Devices</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.popup_nav_children_container} ${styles.popup_child_container}`}
                             style={{flexDirection: "column"}}>

                            <h3 style={{margin: 0}}>{SettingsView[settingsView].toString()}</h3>
                            <hr className={styles.hr}/>

                            {user && settingsView === SettingsView.Comments && <button onClick={() => {
                                migrateMutation.mutate(user.id, {
                                    onSuccess: () => {
                                        alert("Migration Complete")
                                    },
                                    onError: (err) => {
                                        alert(err)
                                    }
                                })
                            }}>Migrate Comments</button>}

                            {settingsView === SettingsView.Tasks &&
                                <>

                                    {user?.role === 'MASTER' &&
                                        <>
                                            <p>Assign all Tasks to a User</p>
                                            <select
                                                onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}
                                            >
                                                <option>Select user</option>
                                                {users.map(x => (
                                                    <option selected={selectedUserId === x.id} id={x.id.toString()}
                                                            value={x.id}>{x.name}</option>
                                                ))}
                                            </select>
                                            {selectedUserId &&
                                                <div className={`${styles.row} ${styles.width_100}`}>
                                                    <button onClick={() => {
                                                        assignUserToAllTasksMutation.mutate({userId: selectedUserId}, {
                                                            onSuccess: () => {

                                                                dispatch(action({
                                                                    taskData: taskData.map((x: any) => ({
                                                                        ...x,
                                                                        users: x.users.map((u: any) => u.userId).includes(selectedUserId)
                                                                            ? x.users
                                                                            : [...x.users, {
                                                                                userId: selectedUserId,
                                                                                [`${'tasks'.slice(0, -1)}Id`]: x.id
                                                                            }]
                                                                    }))
                                                                }))
                                                            },
                                                            onError: (err) => alert(err)
                                                        });
                                                    }}>
                                                        Assign to ALL Tasks <Layers size={14}/>
                                                    </button>

                                                    <button onClick={() => {
                                                        unAssignUserToAllTasksMutation.mutate({userId: selectedUserId}, {
                                                            onSuccess: () => {

                                                                dispatch(action({
                                                                    taskData: taskData.map((x: any) => ({
                                                                        ...x,
                                                                        users: x.users.filter((u: any) => u.userId !== selectedUserId)
                                                                    }))
                                                                }))
                                                            },
                                                            onError: (err) => alert(err)
                                                        });
                                                    }}>
                                                        Unassign from ALL Tasks <Layers size={14}/>
                                                    </button>
                                                </div>
                                            }
                                            <div className={`${styles.row} ${styles.width_100} ${styles.margin_y_10px}`}>
                                                <button onClick={() => {
                                                    archiveAllQuery.mutate({}, {
                                                        onSuccess: () => {
                                                            dispatch(action({
                                                                taskData: taskData.map(x => ({...x, archived: true}))
                                                            }))
                                                        }
                                                    })
                                                }}>
                                                    Archive all Tasks
                                                </button>
                                                <button onClick={() => {
                                                    restoreAllQuery.mutate({}, {
                                                        onSuccess: () => {
                                                            dispatch(action({
                                                                taskData: taskData.map(x => ({...x, archived: false}))
                                                            }))
                                                        }
                                                    })
                                                }}>
                                                    Restore all Tasks
                                                </button>
                                            </div>
                                            <hr className={styles.hr}/>
                                            <p>Danger zone</p>
                                            <br/>
                                            <Popup trigger={(
                                                <button className={styles.alert_text}>
                                                    <p>Delete all Tasks</p>
                                                    <AlertTriangle size={14}/>
                                                </button>
                                            )} position={"center center"} contentStyle={{zIndex: 10000}}>
                                                <div className={`${styles.popup} ${styles.col} ${styles.padding_10px}`}
                                                     style={{alignItems: "center"}}>
                                                    <p>Are you sure you want to delete ALL tasks?</p>
                                                    <button className={styles.alert_text}
                                                            onClick={handleDeleteAllTasks}>
                                                        <p>Yes</p>
                                                    </button>
                                                </div>
                                            </Popup>
                                        </>
                                    }

                                    {user?.role !== "MASTER" &&
                                        <>
                                            <p>Danger zone</p>
                                            <br/>
                                        </>
                                    }

                                    <button className={styles.alert_text}
                                            onClick={() => {
                                                user && deleteAllUserTasksMutation.mutate(user.id, {
                                                    onSuccess: (data) => {
                                                        if (user.role === "MASTER") {
                                                            dispatch(action({
                                                                taskData: taskData.map((x: any) => ({
                                                                    ...x,
                                                                    users: x.users.filter((u: any) => u.userId !== user.id)
                                                                }))
                                                            }))
                                                        } else {
                                                            dispatch(action({
                                                                taskData: []
                                                            }))
                                                        }
                                                    },
                                                    onError: (err) => {
                                                        alert(err)
                                                    }
                                                })
                                            }}>
                                        <p>Unassign yourself from all Tasks</p>
                                        <AlertTriangle size={14}/>
                                    </button>
                                </>
                            }

                            {settingsView === SettingsView.Hints &&
                                <>
                                    <p>Assign all Hints to a User</p>
                                    <select
                                        onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}
                                    >
                                        <option>Select user</option>
                                        {users.map(x => (
                                            <option selected={selectedUserId === x.id} id={x.id.toString()}
                                                    value={x.id}>{x.name}</option>
                                        ))}
                                    </select>
                                    {selectedUserId &&
                                        <div className={`${styles.row} ${styles.width_100}`}>
                                            <button onClick={() => {
                                                assignUserToAllHintsMutation.mutate({userId: selectedUserId}, {
                                                    onSuccess: () => {

                                                        dispatch(action({
                                                            hintData: hintData.map((x: any) => ({
                                                                ...x,
                                                                users: x.users.map((u: any) => u.userId).includes(selectedUserId)
                                                                    ? x.users
                                                                    : [...x.users, {
                                                                        userId: selectedUserId,
                                                                        [`${'hints'.slice(0, -1)}Id`]: x.id
                                                                    }]
                                                            }))
                                                        }))
                                                    },
                                                    onError: (err) => alert(err)
                                                });
                                            }}>
                                                Assign to ALL Hints <Info size={14}/>
                                            </button>

                                            <button onClick={() => {
                                                unAssignUserToAllHintsMutation.mutate({userId: selectedUserId}, {
                                                    onSuccess: () => {

                                                        dispatch(action({
                                                            hintData: hintData.map((x: any) => ({
                                                                ...x,
                                                                users: x.users.filter((u: any) => u.userId !== selectedUserId)
                                                            }))
                                                        }))
                                                    },
                                                    onError: (err) => alert(err)
                                                });
                                            }}>
                                                Unassign from ALL Hints <Info size={14}/>
                                            </button>
                                        </div>
                                    }

                                    <hr className={styles.hr}/>
                                    <p>Danger zone</p>
                                    <br/>
                                    <Popup trigger={(
                                        <button className={styles.alert_text}>
                                            <p>Delete all Hints</p>
                                            <AlertTriangle size={14}/>
                                        </button>
                                    )} position={"center center"} contentStyle={{zIndex: 10000}}>
                                        <div className={`${styles.popup} ${styles.col} ${styles.padding_10px}`}
                                             style={{alignItems: "center"}}>
                                            <p>Are you sure you want to delete ALL hints?</p>
                                            <button className={styles.alert_text} onClick={handleDeleteAllHints}>
                                                <p>Yes</p>
                                            </button>
                                        </div>
                                    </Popup>
                                </>
                            }

                            {settingsView === SettingsView.Notes &&
                                <>
                                    <p>Danger zone</p>
                                    <br/>
                                    <Popup trigger={(
                                        <button className={styles.alert_text}>
                                            <p>Delete All Notes</p>
                                            <AlertTriangle size={14}/>
                                        </button>
                                    )} position={"bottom right"}>
                                        <div style={{alignItems: "center"}}
                                             className={`${styles.popup} ${styles.col} ${styles.padding_10px}`}>
                                            <p>Are you sure you want to delete ALL notes?</p>
                                            <button className={styles.alert_text}
                                                    onClick={() => {
                                                        if (user) {
                                                            deleteAllNotesMutation.mutate(user.id, {
                                                                onSuccess: (data) => {
                                                                    dispatch(action({notes: []}))
                                                                },
                                                                onError: (err) => {
                                                                    alert(err)
                                                                }
                                                            })
                                                        }
                                                    }}>
                                                <p>Yes</p>
                                            </button>
                                        </div>
                                    </Popup>

                                </>
                            }

                            {settingsView === SettingsView.Devices &&
                                <>
                                    {renderDevices()}
                                </>
                            }

                        </div>
                    </div>
                }/>}

            </>
        );
    };

    return renderAssignUserToAll()
}