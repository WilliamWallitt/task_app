import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "~/redux/store";
import {action, entireState} from "~/redux/state";
import styles from "../pages/index.module.css";
import {api} from "~/utils/api";
import {Image} from "~/components/tasks";
import {Loader} from "react-feather";
import { motion } from "framer-motion";

interface AdminImagesProps {}

export const AdminImages = ({}: AdminImagesProps) => {

    const dispatch = useDispatch();
    const state = useAppSelector(entireState)
    const {images, user, users} = state

    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const uploadImageMutation = api.image.upload.useMutation()
    const deleteImageMutation = api.image.deleteImage.useMutation()

    const handleJSONFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const file = e.target.files?.[0];
        if (!file) {
            setIsLoading(false)
            return
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(",")[1]; // Extract Base64
            if (base64String) {
                setPreview(`data:image/png;base64,${base64String}`); // Show Preview
                uploadImageMutation.mutate({ image: base64String }, {
                    onSuccess: (data) => {
                        if (data === null) {
                            alert("Image upload failed...")
                        }

                        dispatch(action({
                            images: [(data as Image), ...images]
                        }))
                        setIsLoading(false)
                    },
                    onError: (err) => {
                        setPreview(null)
                        setIsLoading(false)
                        alert(err)
                    }
                });
            } else {
                setIsLoading(false)
                alert("Image upload failed...")
            }
        };
    };

    return (
        <div className={`${styles.col} ${styles.width_100} ${styles.padding_10px}`}>
            <div className={`${styles.row} ${styles.width_100} ${styles.row_center}`} style={{flexWrap: "nowrap"}}>
                {preview &&
                    <img className={`${styles.user_avatars} ${styles.admin_avatar}`}
                         src={preview} alt="preview image"/>
                }
                <input type="file" accept="image/*" onChange={handleJSONFileChange}/>
                {isLoading &&
                    <button>
                        <Loader className={styles.loading_icon} size={14}/>
                    </button>
                }
            </div>
            <p>Uploaded Images</p>
            <motion.div className={`${styles.row} ${styles.width_100}`} style={{flexWrap: "wrap"}}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}>
                {images.map(image => (
                    <motion.img
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                        transition={{ duration: 0.4 }}
                        key={image.id}
                        onClick={() => {
                            deleteImageMutation.mutate({
                                id: image.id
                            }, {
                                onSuccess: (data) => {
                                    // update local storage...
                                    if (user?.imageId === data) {
                                        localStorage.setItem("user", JSON.stringify({...user, imageId: null, image: null}))
                                    }

                                    dispatch(action({
                                        images: images.filter(i => i.id !== data),
                                        user: user?.imageId === data ? {...user, imageId: null, image: null} : user,
                                        users: users.map(u => u.imageId === data ? {...u, imageId: null, image: null} : u)
                                    }))

                                },
                                onError: (err) => {
                                    alert(err)
                                }
                            })
                        }}
                        title={`Remove Image`}
                        src={`data:image/*;base64,${image.image}`}
                        alt="Image"
                        className={`${styles.user_avatars} ${styles.admin_avatar}`}
                        width={100}
                        height={100}
                    />
                ))}
            </motion.div>
        </div>
    )
}