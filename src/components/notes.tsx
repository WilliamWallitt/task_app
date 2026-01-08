import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import styles from "~/pages/index.module.css";
import {api} from "~/utils/api";
import {AlertTriangle, Send, XCircle} from "react-feather";
import {Field, Type} from "~/components/field";
import Popup from "reactjs-popup";

export const Notes = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {notes, user} = state

    const addNoteMutation = api.note.add.useMutation()
    const deleteNoteMutation = api.note.delete.useMutation()
    // const deleteAllNotesMutation = api.note.deleteAll.useMutation()
    const updateNoteMutation = api.note.update.useMutation()

    return (
        <div className={styles.main}>
            <div className={`${styles.col} ${styles.width_100} ${styles.padding_10px}`}>

                {notes.length === 0 && <div className={`${styles.row} ${styles.row_wrap}`}
                                            style={{justifyContent: "center"}}>
                    <p>No notes found.</p>
                </div>}

                <table className={styles.width_100}>
                    <tr className={styles.width_100}>
                        <td className={styles.width_100}>
                            <Field style={{background: "transparent"}} clearInputOnUpdate={true} onUpdateHandler={(note) => {
                                if (user && note !== "") {
                                    addNoteMutation.mutate({
                                        note: note,
                                        userId: user.id
                                    }, {
                                        onSuccess: (data) => {
                                            dispatch(action({notes: [...notes, data]}))
                                        },
                                        onError: (err) => {
                                            alert(err)
                                        }
                                    })
                                }
                            }} type={Type.Text} placeholder={"Add a new Note"}/>
                        </td>
                        <td></td>
                    </tr>
                    {notes.map(x => (
                        <>
                            <tr className={styles.width_100}>
                                <td style={{display: "flex", alignItems: "center"}}>
                                    <Field style={{background: "transparent"}} value={x.note}
                                           onUpdateHandler={(note) => updateNoteMutation.mutate({
                                               id: x.id,
                                               note,
                                           }, {
                                               onSuccess: (data) => {
                                                   dispatch(action({notes: notes.map(h => h.id === x.id ? {...h, ...data} : h)}))
                                               },
                                               onError: (err) => {
                                                   alert(err)
                                               }
                                           })}
                                           type={Type.Text} placeholder={"Note"}/>
                                </td>
                                <td>
                                    <XCircle size={14}
                                             onClick={() => deleteNoteMutation.mutate(x.id, {
                                                 onSuccess: (data) => {
                                                    dispatch(action({notes: notes.filter(h => h.id !== data.id)}))
                                                 },
                                                 onError: (err) => {
                                                     alert(err)
                                                 }
                                             })}/>
                                </td>
                            </tr>
                        </>
                    ))}
                </table>
            </div>


        </div>
    )
}