import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState, UserWithImage} from "~/redux/state";
import styles from "../pages/index.module.css";
import {UserLoginSignup} from "~/components/userLoginSignup";
import { motion } from "framer-motion";

export const AdminUsers = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {users, selectedAdminUserId} = state

    const renderUser = (user: UserWithImage) => {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                onClick={() => dispatch(action({selectedAdminUserId: user.id}))} style={{width: "auto", cursor: "pointer"}}
                 className={`${styles.col} ${styles.col_all_center} ${styles.margin_6px}`}>
                <motion.img
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.4 }}
                    key={user.id}
                    src={user.image ? `data:image/*;base64,${user.image?.image}` : undefined} alt={"User image"}
                     className={`${styles.admin_avatar} ${styles.user_avatar}`}/>
                <p>{user.name}</p>
            </motion.div>
        )
    }

    useEffect(() => {
        if (selectedAdminUserId === null) {
            dispatch(action({selectedAdminUserId: users[0]?.id ?? null}))
        }
    }, [])

    useEffect(() => {
        if (!users.find(x => x.id === selectedAdminUserId)) {
            dispatch(action({selectedAdminUserId: users[0]?.id ?? null}))
        }
    }, [users]);


    return (

        <div className={styles.admin_user_container}>
            <div className={styles.admin_user_items_container}>
                {users.map(u => renderUser(u))}
            </div>

            {selectedAdminUserId && <UserLoginSignup userToEdit={users.find(x => x.id === selectedAdminUserId)}/>}
        </div>
    )

}