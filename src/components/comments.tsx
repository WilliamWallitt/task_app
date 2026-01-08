import React, {useState} from "react";
import {Comment} from "@prisma/client";
import {api} from "~/utils/api";
import styles from "~/pages/index.module.css";
import {Field, Type} from "~/components/field";
import {Copy, Edit, XCircle} from "react-feather";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import TimeAgo from "javascript-time-ago";

interface CommentsProps {
    comment: Comment[],
    taskId: number,
    isAdmin: boolean
}
export const Comments = ({comment, taskId, isAdmin}: CommentsProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {taskData, user, users} = state
    const timeAgo = new TimeAgo('en-US')

    const addCommentMutation = api.task.addComment.useMutation()
    const updateCommentMutation = api.task.updateComment.useMutation()
    const deleteCommentMutation = api.task.deleteComment.useMutation()
    const [commentId, setCommentId] = useState<null | number>(null)

    const renderUserImage = (comment: Comment) => {
        const user = users.find(u => u.id === comment.userId)
        if (!user) return <></>

        return (
            <>
                <img id={user.id + "_" + taskId + "_" + comment.id}
                     className={styles.task_avatar}
                     title={user.name} alt={"user img"}
                     src={`data:image/*;base64,${user.image?.image ?? ""}`}/>
                <p style={{marginLeft: "10px"}}>added <span
                    className={styles.tag}>{timeAgo.format(comment.createdAt)}</span>&nbsp;&#x2022;&nbsp;updated <span
                    className={styles.tag}>{timeAgo.format(comment.updatedAt)}</span>&nbsp;&#x2022;&nbsp;by <span
                    className={styles.tag}>{user?.name}</span>
                </p>
            </>
        )

    }

    return (
        <div className={`${styles.col} ${styles.width_100} ${styles.margin_y_10px}`}>
            <h1>Comments</h1>

            <div className={`${styles.col} ${styles.width_100}`} style={{maxHeight: "300px", overflowY: "auto"}}>
                {comment.map(x => (
                        <>
                            <div className={`${styles.row} ${styles.width_100} ${styles.row_center} ${styles.margin_y_10px}`} style={{flexWrap: "nowrap"}}>
                                {renderUserImage(x)}
                                {(x.userId === user?.id || ((user?.role === "MASTER") && isAdmin)) &&
                                    <XCircle width={25} size={14} onClick={() => {
                                        deleteCommentMutation.mutate({
                                            id: x.id,
                                        }, {
                                            onSuccess: (data) => {
                                                dispatch(action({
                                                    taskData: taskData.map(t => t.id === taskId ? {
                                                        ...t, Comment: t.Comment.filter(c => c.id !== data.id)
                                                    } : t)
                                                }))
                                            },
                                            onError: (err) => {
                                                alert(err)
                                            }
                                        })
                                    }}/>
                                }
                                <Copy width={25}
                                      onClick={(e) => window.isSecureContext && window.navigator.clipboard.writeText(x.text)}
                                      size={14}/>
                                {!((x.userId !== user?.id) && !(!(user?.role === "MASTER") && isAdmin)) &&
                                    <Edit size={14} width={25} onClick={() => {
                                        if (x.id === commentId) {
                                            setCommentId(null)
                                        } else {
                                            setCommentId(x.id)
                                        }
                                    }}/>
                                }
                            </div>


                            <div className={`${styles.row} ${styles.width_100} ${styles.row_center}`}>
                                <Field paragraphOnDisable={true} inputLength={0} value={x.text}
                                       disabled={commentId !== x.id}
                                       onUpdateHandler={(input) => {
                                           updateCommentMutation.mutate({
                                               id: x.id,
                                               text: input
                                           }, {
                                               onSuccess: (data) => {
                                                   dispatch(action({
                                                       taskData: taskData.map(t => t.id === taskId ? {
                                                           ...t, Comment: t.Comment.map(c => c.id === data.id ? data : c)
                                                       } : t)
                                                   }))
                                               },
                                               onError: (err) => {
                                                   alert(err)
                                               }
                                           })
                                       }}
                                       type={Type.Text} placeholder={"Comments"}/>
                            </div>
                        </>
                    )
                )}
            </div>

            <br/>
            <Field
                clearInputOnUpdate={true}
                onUpdateHandler={(input) => {
                    if (user) {
                        addCommentMutation.mutate({
                            userId: user.id,
                            taskId: taskId,
                            text: input
                        }, {
                            onSuccess: (data) => {
                                dispatch(action({
                                    taskData: taskData.map(t => t.id === taskId ? {
                                        ...t, Comment: [data, ...t.Comment]
                                    } : t)
                                }))
                            },
                            onError: (err) => {
                                alert(err)
                            }
                        })
                    }
                }}
                type={Type.Input} placeholder={"Add a Comment"}/>
        </div>
    )

}