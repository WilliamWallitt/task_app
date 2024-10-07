import React, {useState} from "react";
import styles from "~/pages/index.module.css";
import {Field, Type} from "~/components/field";
import Toggle from "react-toggle";
import {Hint} from "~/components/tasks";
import {api} from "~/utils/api";

interface HintsProps {
    hintData:  Hint[];
}
export const Hints = ({hintData}: HintsProps) => {

    const [hints, setHints] = useState<Hint[]>(hintData)
    const [editHints, setEditHints] = useState<boolean>(false)

    const addHintMutation = api.hint.add.useMutation()
    const deleteHintMutation = api.hint.delete.useMutation()

    const addHintBulletMutation = api.hintBullet.add.useMutation()
    const deleteHintBulletMutation = api.hintBullet.delete.useMutation()

    return (
        <div className={`${styles.col} ${styles.col_hints}`} style={{
            background: "var(--bg-color-light)",
            padding: "0 10px",
            margin: "0 10px",
            borderRadius: "8px"
        }}>
            <div className={`${styles.col_chesat} ${styles.col_hints_container}`}>
                {hints.map(x => (
                    <div key={x.id} className={styles.col}>
                        <div className={`${styles.row} ${styles.row_center}`}>
                            <p><strong>{x.hint}</strong></p>
                            {editHints &&
                                <button
                                    onClick={() => deleteHintMutation.mutate(x.id, {
                                        onSuccess: (data) => {
                                            setHints((prevState) => prevState.filter(x => x.id !== data.id))
                                        }
                                    })}>
                                    Delete
                                </button>
                            }
                        </div>
                        {x.bullets.map(b => (
                            <div key={b.id} className={styles.col}>
                                <Field disabled={true} value={b.bullet}
                                       onUpdateHandler={() => null}
                                       type={Type.Code} placeholder={"Bullet"}/>
                                {editHints &&
                                    <button
                                        onClick={() => deleteHintBulletMutation.mutate(b.id, {
                                            onSuccess: (data) => {
                                                setHints((prevState) => prevState.map(h => (
                                                    h.id === data.hintId ? {
                                                        ...h,
                                                        bullets: h.bullets.filter(b => b.id !== data.id)
                                                    } : h
                                                )))
                                            }
                                        })}>Delete
                                    </button>
                                }
                            </div>
                        ))}
                        <Field hide={!editHints} onUpdateHandler={(input) => {
                            addHintBulletMutation.mutate({
                                hintId: x.id,
                                bullet: input
                            }, {
                                onSuccess: (data) => {
                                    setHints((prevState) => prevState.map(h => h.id === data.hintId ? {
                                        ...h,
                                        bullets: [...h.bullets, data]
                                    } : h))
                                }
                            })
                        }} clearInputOnUpdate={true} type={Type.Code}
                               placeholder={`Add a new bullet for "${x.hint}"`}/>
                    </div>
                ))}
                <div className={`${styles.row}`}>
                    <div className={`${styles.col} ${styles.width_100}`}>

                        <Field hide={!editHints} clearInputOnUpdate={true}
                               onUpdateHandler={(input) => {
                                   addHintMutation.mutate({
                                       hint: input
                                   }, {
                                       onSuccess: (data) => {
                                           setHints(prevState => [data, ...prevState])
                                       }
                                   })
                               }} type={Type.Text} placeholder={"Add a new hint."}/>
                    </div>
                </div>
            </div>
            <div className={`${styles.col_all_center} ${styles.margin_10px}`}>
                <Toggle
                    defaultChecked={editHints}
                    onChange={(e) => setEditHints(e.target.checked)}/>
                <span style={{marginTop: "10px"}}>Edit Hints</span>
            </div>
        </div>
    )
}