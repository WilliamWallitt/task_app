import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "~/pages/index.module.css";
import {Field, Type} from "~/components/field";
import Toggle from "react-toggle";
import {Hint, Task as T} from "~/components/tasks";
import {api} from "~/utils/api";
import {ArrowDownRight, CornerDownRight, Edit, Loader, XCircle} from "react-feather";
import {WeatherForcast} from "~/components/weatherForcast";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import {GetGPTRequest} from "~/utils/gpt";
import {Levels} from "~/components/userLoginSignup";
import { motion } from "framer-motion";

interface HintsProps {
    hints:  Hint[];
    isAdmin: boolean;
}
export const Hints = ({hints, isAdmin}: HintsProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<keyof Levels>("Beginner" as keyof Levels)
    const [loadingGpt, setLoadingGpt] = useState<boolean>(false)

    const {user, users} = state

    const addHintMutation = api.hint.add.useMutation()
    const deleteHintMutation = api.hint.delete.useMutation()
    const updateHintMutation = api.hint.update.useMutation()

    const addHintBulletMutation = api.hintBullet.add.useMutation()
    const deleteHintBulletMutation = api.hintBullet.delete.useMutation()
    const updateHintBulletMutation = api.hintBullet.update.useMutation()


    const generate_gpt_prompt = (hintTitle: string) => {
        return `Given a title ${hintTitle}, which is a programming topic in python for a person to learn. Create concise bullet points for what code to know and learn for that topic for a ${selectedLevel} python student to refer to and use to solve problems.`
    }

    const generate_gpt_problem = (hintTitle: string, hintId: number, bulletId: number) => {
        setLoadingGpt(true)
        GetGPTRequest({
            messages: [{ role: "user", content: generate_gpt_prompt(hintTitle) }],
            model: 'o3-mini-2025-01-31'
        }, (message) => {
            dispatch(action({
                hintData: hints.map(
                    h => h.id === hintId
                        ? {...h, bullets: h.bullets.map(b => b.id === bulletId ? {...b, bullet: message.content} : b)}
                        : h
                )
            }))
            setLoadingGpt(false)
        })
    }

    const renderAssignedUsers = (x: Hint) => {
        const taskUsers = x.users.map(tu => tu.userId)
        const taskUsersInfo = users.filter(u => taskUsers.includes(u.id))
        const notTaskUsersInfo = users.filter(u => !taskUsers.includes(u.id))

        return (
            <div id={x.id.toString()} className={`${styles.row} ${styles.row_center}`}>
                {taskUsersInfo.map(tu => (
                    <>
                        <img id={tu.id.toString()} onClick={() => {
                            if (isAdmin) {

                                let hint = hints.find(h => h.id === x.id)

                                if (hint) {
                                    updateHintMutation.mutate({
                                        hint: hint.hint,
                                        id: hint.id,
                                        userIds: hint.users.map(x => x.userId).filter(u => u !== tu.id)
                                    }, {
                                        onSuccess: (data) => {
                                            dispatch(action({
                                                hintData: hints.map(task => task.id === x.id
                                                    ? data as Hint
                                                    : task)
                                            }))
                                        },
                                        onError: (err) => {
                                            alert(err)
                                        }
                                    })
                                }
                            }
                        }}  title={isAdmin ? "Remove: " + tu.name  : tu.name} alt={"user img"}
                             className={styles.task_avatar}
                             src={`data:image/*;base64,${tu.image?.image}`}/>
                    </>
                ))
                }
                {/*TODO - this is badly named, update variable ref*/}
                {notTaskUsersInfo.length > 0 && isAdmin &&
                    <div className={`${styles.row} ${styles.row_center} ${styles.margin_6px}`}>
                        <select onChange={(e) => setSelectedUserId(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value))}>
                            <option>--Select User--</option>
                            {notTaskUsersInfo.map(x => (
                                <option selected={selectedUserId === x.id} id={x.id.toString()} value={x.id}>
                                    {x.name}
                                </option>
                            ))}
                        </select>
                        {selectedUserId &&
                            <button onClick={() => {

                                let hint = hints.find(h => h.id === x.id)
                                if (hint) {
                                    updateHintMutation.mutate({
                                        hint: hint.hint,
                                        id: hint.id,
                                        userIds: [...hint.users.map(x => x.userId), selectedUserId]
                                    }, {
                                        onSuccess: (data) => {
                                            dispatch(action({
                                                hintData: hints.map(task => task.id === x.id
                                                    ? data as Hint
                                                    : task)
                                            }))
                                        },
                                        onError: (err) => {
                                            alert(err)
                                        }
                                    })
                                }
                            }}>
                                Add
                            </button>
                        }

                    </div>
                }
            </div>
        )
    }

    return (
        <div className={`${styles.col} ${styles.width_100}`}>

            {hints.length === 0 && <div className={`${styles.row} ${styles.row_wrap}`}
                                        style={{justifyContent: "center"}}>
                <p>No hints found.</p>
            </div>}


            <table
                className={styles.width_100}>
                {isAdmin &&
                    <tr>
                        <td>
                                <Field rows={2} clearInputOnUpdate={true}
                                       onUpdateHandler={(input) => {
                                           addHintMutation.mutate({
                                               hint: input,
                                               userIds: user ? [user.id] : []
                                           }, {
                                               onSuccess: (data) => {
                                                   dispatch(action({hintData: [data, ...hints]}))
                                               },
                                               onError: (err) => {
                                                   alert(err)
                                               }
                                           })
                                       }} type={Type.Text} placeholder={"Add a new hint."}/>
                            </td>
                        <td></td>
                    </tr>
                }
                {hints.map(x => (
                    <>
                        {isAdmin && <tr>
                            <td style={{display: "flex", alignItems: "center"}}>
                                {renderAssignedUsers(x)}
                            </td>
                            <td></td>
                        </tr>}

                        <tr key={x.id}>
                            <td style={{display: "flex", alignItems: "center"}}>
                                <Field paragraphOnDisable={true} disabled={!isAdmin} value={x.hint}
                                       onUpdateHandler={(hint) => updateHintMutation.mutate({
                                           id: x.id,
                                           hint,
                                           userIds: user ? [user.id] : []
                                       }, {
                                           onSuccess: (data) => {
                                               dispatch(action({hintData: hints.map(h => h.id === x.id ? {...h, ...data} : h)}))
                                           },
                                           onError: (err) => {
                                               alert(err)
                                           }
                                       })}
                                       style={!isAdmin ? {
                                           // background: "transparent",
                                           fontSize: "1.2rem",
                                           padding: "0 10px"
                                           // fontWeight: "bold",
                                       } : {}}
                                       rows={2}
                                       type={Type.Text} placeholder={"Hint"}/>
                            </td>
                            <td>
                                {isAdmin &&
                                    <XCircle size={14}
                                             onClick={() => deleteHintMutation.mutate(x.id, {
                                                 onSuccess: (data) => {
                                                     dispatch(action({
                                                         hintData: hints.filter(x => x.id !== data.id)
                                                     }))
                                                 },
                                                 onError: (err) => {
                                                     alert(err)
                                                 }
                                             })}/>
                                }
                            </td>
                        </tr>

                        {x.bullets && x.bullets.map(b => (
                            <tr key={b.id}>
                                <td className={`${styles.col}`} style={{display: "flex", alignItems: "center"}}>
                                    {
                                        isAdmin && <div className={`${styles.row} ${styles.margin_y_10px} ${styles.row_center}`} style={{flexWrap: "nowrap"}}>

                                            {!loadingGpt &&
                                                <>
                                                    <button onClick={(e) => generate_gpt_problem(x.hint, x.id, b.id)}>
                                                        Suggest Hint Bullet (GPT)
                                                    </button>
                                                </>
                                            }
                                            {loadingGpt &&
                                                <button>
                                                    <Loader className={styles.loading_icon} size={14}/>
                                                </button>
                                            }

                                            <select onChange={(e) => setSelectedLevel(e.target.value as keyof Levels)}>
                                                {Object.keys(Levels).filter(x => isNaN(parseInt(x as string))).map(k => (
                                                    <option selected={selectedLevel === k}>{k}</option>
                                                ))}
                                            </select>

                                        </div>
                                    }

                                    <Field disabled={!isAdmin} value={b.bullet}
                                           onUpdateHandler={(bullet) => updateHintBulletMutation.mutate({
                                               id: b.id,
                                               bullet
                                           }, {
                                               onSuccess: (data) => {
                                                   dispatch(action({
                                                       hintData: hints.map(h => ({
                                                           ...h,
                                                           bullets: h.bullets.map(b => b.id === data.id ? {
                                                               ...b,
                                                               bullet: data.bullet
                                                           } : b)
                                                       }))
                                                   }))
                                               },
                                               onError: (err) => {
                                                   alert(err)
                                               }
                                           })}
                                           type={Type.Code} placeholder={"Bullet"}/>
                                </td>
                                <td>
                                    {isAdmin &&
                                        <XCircle size={14} onClick={() => deleteHintBulletMutation.mutate(b.id, {
                                            onSuccess: (data) => {
                                                dispatch(action({
                                                    hintData: hints.map(h => (
                                                        h.id === data.hintId ? {
                                                            ...h,
                                                            bullets: h.bullets.filter(b => b.id !== data.id)
                                                        } : h
                                                    ))
                                                }))
                                            },
                                            onError: (err) => {
                                                alert(err)
                                            }
                                        })}/>
                                    }
                                </td>
                            </tr>
                        ))}
                        {isAdmin &&
                            <tr>
                                <td style={{marginLeft: "40px", display: "flex", alignItems: "center"}}>
                                    <Field code_editor_height_px={"30px"} onUpdateHandler={(input) => {
                                        addHintBulletMutation.mutate({
                                            hintId: x.id,
                                            bullet: input
                                        }, {
                                            onSuccess: (data) => {
                                                dispatch(action({
                                                    hintData: hints.map(h => h.id === data.hintId ? {
                                                        ...h,
                                                        bullets: [...h.bullets, data]
                                                    } : h)
                                                }))
                                            },
                                            onError: (err) => {
                                                alert(err)
                                            }
                                        })
                                    }} clearInputOnUpdate={true} type={Type.Code}
                                           placeholder={`Add a new bullet for "${x.hint}"`}/>
                                </td>
                                <td></td>
                            </tr>
                        }
                    </>
                ))}
            </table>

        </div>
    )
}