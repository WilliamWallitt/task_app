import React, {useEffect, useState} from "react";
import {entireState, useAppDispatch, useAppSelector} from "~/redux/store";
import styles from "~/pages/index.module.css";
import {Field, Type} from "~/components/field";
import {Loader, Send, User, UserMinus} from "react-feather";
import {api} from "~/utils/api";
import {action, UserImage, UserWithImage} from "~/redux/state";
import {View} from "~/components/tasks";
import {motion} from "framer-motion";
import {getDeviceInfo, getUserLocation} from "~/utils/device";
import {boolean} from "zod";

export enum UserLoginSignupView {
    LOGIN,
    SIGNUP
}

export enum Levels {
    Beginner,
    Intermediate,
    Advanced,
    Expert
}

export enum USER_ROLES {
    USER,
    ADMIN,
    MASTER
}

export interface LoginData {
    id: number, name: string,
    pin: string, email: string,
    avatar: string, level: number,
    role: string,
    image: UserImage,
    objective: string,
    codingStyle: string,
    learningGoals: string,
    personalityType: string | null,
    preferredDifficulty: string,
    preferredTopics: string,
    prefersCodeQuality: boolean,
    pythonVersion: string,
    riskTolerance: string | null,
    strengths: string,
    taskTypePreference: string,
    timePerTaskMinutes: number | null,
    weaknesses: string
}

const populatedLoginData : LoginData = {
    codingStyle: "",
    learningGoals: "",
    objective: "",
    personalityType: "",
    preferredDifficulty: "",
    preferredTopics: "",
    prefersCodeQuality: false,
    pythonVersion: "",
    riskTolerance: "",
    strengths: "",
    taskTypePreference: "",
    timePerTaskMinutes: 0,
    weaknesses: "",
    id: 0,
    name: "",
    pin: "0000",
    avatar: "",
    level: 0,
    email: "",
    role: "USER",
    image: null
}

interface UserLoginSignupProps {
    userToEdit?: UserWithImage
}

export const UserLoginSignup = ({userToEdit}: UserLoginSignupProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {user, users, images} = state

    const [view, setView] = useState<UserLoginSignupView>(!userToEdit ? (user === null ? UserLoginSignupView.LOGIN : UserLoginSignupView.SIGNUP) : UserLoginSignupView.SIGNUP)
    const [loginData, setLoginData] = useState<LoginData>(populatedLoginData)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const updateLoginData = (user: UserWithImage) => {

        setLoginData({
            codingStyle: user.codingStyle,
            learningGoals: user.learningGoals,
            objective: user.objective,
            personalityType: user.personalityType,
            preferredDifficulty: user.preferredDifficulty,
            preferredTopics: user.preferredTopics,
            prefersCodeQuality: user.prefersCodeQuality,
            pythonVersion: user.pythonVersion,
            riskTolerance: user.riskTolerance,
            strengths: user.strengths,
            taskTypePreference: user.taskTypePreference,
            timePerTaskMinutes: user.timePerTaskMinutes,
            weaknesses: user.weaknesses,
            id: user.id,
            // pin: user.pin,
            pin: "0000",
            name: user.name,
            email: user.email,
            avatar: user.avatar ?? "",
            level: user.level,
            role: user.role,
            image: user.image
        })
    }

    useEffect(() => {
        if (user !== null && !userToEdit) {
            updateLoginData(user)

            if (localStorage.getItem("user") === null) {
                localStorage.setItem("user", JSON.stringify(user))
                window.dispatchEvent(new Event("storage"))
            }
        } else if (userToEdit) {
            updateLoginData(userToEdit)
        }
    }, [user, userToEdit]);

    const addUserMutation = api.user.add.useMutation()
    const updateUserMutation = api.user.update.useMutation()
    const deleteUserMutation = api.user.delete.useMutation()

    const uploadAvatarMutation = api.image.uploadAvatar.useMutation()
    const logDeviceMutation = api.user.logDevice.useMutation()

    const uploadAvatar = (userId: number, base64String: string | undefined, imageId: number | undefined) => {

        uploadAvatarMutation.mutate({ userId, image: base64String, imageId: imageId}, {
            onSuccess: (data) => {
                if ((!userToEdit && data)) {
                    localStorage.setItem("user", JSON.stringify(data))
                    dispatch(action({
                        user: (data.id === user?.id || user === null) ? data : user,
                        users: users.map(u => u.id === data.id ? data : u),
                        images: data.image ? [...images, data.image] : images
                    }))

                    // window.dispatchEvent(new Event("storage"))
                } else if (data) {
                    dispatch(action({
                        users: users.map(u => u.id === data.id ? data : u),
                        images: data.image ? [...images, data.image] : images
                    }))
                }
                setIsLoading(false)
            },
            onError: (err) => {
                setIsLoading(false)
                alert(err)
            }
        })
    }

    const handleJSONFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO - sign up to user fak
        setIsLoading(true)
        const file = e.target.files?.[0];
        if (!file) {
            setIsLoading(false)
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(",")[1]; // Extract Base64
            if (base64String) {
                if (user) {
                    uploadAvatar(user.id, base64String, undefined)
                    setIsLoading(false)
                } else if (!user && !userToEdit) {
                    // no user.
                    addUserMutation.mutate({
                        name: loginData.name,
                        pin: loginData.pin,
                        role: loginData.role,
                        avatar: loginData.avatar,
                        level: loginData.level,
                        email: loginData.email,

                        codingStyle: loginData.codingStyle,
                        learningGoals: loginData.learningGoals,
                        objective: loginData.objective,
                        personalityType: loginData.personalityType,
                        preferredDifficulty: loginData.preferredDifficulty,
                        preferredTopics: loginData.preferredTopics,
                        pythonVersion: loginData.pythonVersion,
                        riskTolerance: loginData.riskTolerance,
                        strengths: loginData.strengths,
                        taskTypePreference: loginData.taskTypePreference,
                        timePerTaskMinutes: loginData.timePerTaskMinutes,
                        weaknesses: loginData.weaknesses,
                        prefersCodeQuality: loginData.prefersCodeQuality,
                    }, {
                        onSuccess: (newUser) => {
                            uploadAvatar(newUser.id, base64String, undefined)
                            setIsLoading(false)
                        },
                        onError: (err) => {
                            setIsLoading(false)
                            alert(err)
                        }
                    })
                }
            } else {
                setIsLoading(false)
                alert("Image upload failed...")
            }
        };
    };


    const renderSignup = () => {
        return (
            <div style={{width: "100%", alignItems: "center", justifyContent: "center"}}
                 className={`${styles.col} ${styles.margin_10px}`}>
                <div className={`${styles.margin_10px} ${styles.col} ${styles.width_100}`} style={{flexWrap: "nowrap"}}>
                    <p className={styles.small_text}><i>Upload an image for your Avatar, or choose from the images
                        below</i></p>
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
                        className={`${styles.row} ${styles.width_100}`}
                        style={{flexWrap: "nowrap", alignItems: "center"}}>
                        {loginData.image?.image &&
                            <motion.img
                                variants={{
                                    hidden: {opacity: 0, scale: 0.8},
                                    visible: {opacity: 1, scale: 1}
                                }}
                                transition={{duration: 0.4}}
                                src={`data:image/*;base64,${loginData.image?.image}`} className={styles.user_avatar}
                                alt={"Avatar"}/>
                        }
                        <div className={`${styles.col} ${styles.width_100}`} style={{flexWrap: "nowrap"}}>

                            <input type="file" accept="image/*" onChange={handleJSONFileChange}/>
                            {isLoading &&
                                <button>
                                    <Loader className={styles.loading_icon} size={14}/>
                                </button>
                            }
                        </div>
                    </motion.div>
                </div>

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
                    className={`${styles.row} ${styles.width_100}`}
                    style={{flexWrap: "nowrap", overflowY: "auto", margin: "20px 0"}}>
                    {images.filter(x => (x.id !== loginData.image?.id && x.id !== userToEdit?.image?.id)).map((x) =>
                        <motion.img
                            variants={{
                                hidden: {opacity: 0, scale: 0.8},
                                visible: {opacity: 1, scale: 1}
                            }}
                            transition={{duration: 0.4}}
                            onClick={() => {
                                if (user !== null && !userToEdit && x.image) {
                                    uploadAvatar(user.id, undefined, x.id)
                                }
                                if (userToEdit && x.image) {
                                    uploadAvatar(userToEdit.id, undefined, x.id)
                                }

                                if (!userToEdit && !user) {
                                    // no user.
                                    addUserMutation.mutate({
                                        name: loginData.name,
                                        pin: loginData.pin,
                                        role: loginData.role,
                                        avatar: loginData.avatar,
                                        level: loginData.level,
                                        email: loginData.email,

                                        codingStyle: loginData.codingStyle,
                                        learningGoals: loginData.learningGoals,
                                        objective: loginData.objective,
                                        personalityType: loginData.personalityType,
                                        preferredDifficulty: loginData.preferredDifficulty,
                                        preferredTopics: loginData.preferredTopics,
                                        pythonVersion: loginData.pythonVersion,
                                        riskTolerance: loginData.riskTolerance,
                                        strengths: loginData.strengths,
                                        taskTypePreference: loginData.taskTypePreference,
                                        timePerTaskMinutes: loginData.timePerTaskMinutes,
                                        weaknesses: loginData.weaknesses,
                                        prefersCodeQuality: loginData.prefersCodeQuality,
                                    }, {
                                        onSuccess: (newUser) => {
                                            uploadAvatar(newUser.id, undefined, x.id)
                                            setIsLoading(false)
                                        },
                                        onError: (err) => {
                                            setIsLoading(false)
                                            alert(err)
                                        }
                                    })
                                }

                                // TODO - what we doing with login data???
                                // setLoginData({...loginData, image: x})
                            }}
                            className={styles.user_avatars}
                            alt={"Avatar " + x.id.toString()}
                            src={`data:image/*;base64,${x.image}`}/>)
                    }
                </motion.div>
                <br/>
                <div className={`${styles.row} ${styles.width_100}`} style={{flexWrap: "nowrap"}}>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Username</i></p>
                        <Field value={loginData.name} onUpdateHandler={(name) => {
                            setLoginData({...loginData, name: name})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                    <div className={`${styles.col}`}
                         style={{flexWrap: "nowrap", width: "auto"}}>
                        <p className={styles.small_text}><i>Pin</i></p>
                        <Field value={loginData.pin} onUpdateHandler={(pin) => {
                            setLoginData({...loginData, pin: pin})
                        }}
                               inputType="password"
                               maxLength={4}
                               style={{width: "80px", marginLeft: "8px"}}
                               type={Type.Input} placeholder={""}/>
                    </div>

                </div>

                <div className={`${styles.margin_10px} ${styles.col} ${styles.width_100}`}
                     style={{flexWrap: "nowrap"}}>
                    <p className={styles.small_text}><i>Email</i></p>
                    <Field value={loginData.email} onUpdateHandler={(email) => {
                        setLoginData({...loginData, email: email})
                    }} inputType={"email"} type={Type.Input} placeholder={""}/>
                </div>

                <div className={`${styles.margin_10px} ${styles.col} ${styles.width_100}`} style={{flexWrap: "nowrap"}}>
                    <p className={styles.small_text}><i>Skill level&nbsp;&#x2022;&nbsp;this will help find tasks
                        suitable to you</i></p>
                    <select onChange={e => setLoginData({...loginData, level: parseInt(e.target.value)})}>
                        {Object.values(Levels).filter(x => isNaN(parseInt(x as string))).map((x, i) =>
                            <option key={x}
                                    selected={loginData.level === i}
                                    value={i}>
                                {x}
                            </option>)}
                    </select>
                </div>

                <div className={`${styles.col} ${styles.width_100} ${styles.margin_10px}`} style={{flexWrap: "nowrap"}}>
                    <p className={styles.small_text}><i>Authorization level</i></p>
                    <select onChange={e => setLoginData({
                        ...loginData,
                        role: USER_ROLES[parseInt(e.target.value)] as string
                    })}>
                        {Object.values(USER_ROLES).filter(x => isNaN(parseInt(x as string))).map((x, i) => <option
                            selected={loginData.role === x}
                            disabled={!user || user.role !== "MASTER"}
                            key={x} value={i}>{x}</option>)}
                    </select>
                </div>

                {/*auto task info*/}
                <div className={`${styles.row} ${styles.width_100} ${styles.wrap_row_at_800_px}`} style={{flexWrap: "nowrap"}}>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Coding Style&nbsp;&#x2022;&nbsp;"functional", "OOP",
                            "scripting"</i></p>
                        <Field value={loginData.codingStyle} onUpdateHandler={(codingStyle) => {
                            setLoginData({...loginData, codingStyle})
                        }} type={Type.Input} placeholder={""}/>
                    </div>


                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap", marginLeft: window.innerWidth < 800 ? "0" : "8px"}}>
                        <p className={styles.small_text}><i>Objective&nbsp;&#x2022;&nbsp;"To use Python for financial
                            data analysis"</i></p>
                        <Field value={loginData.objective} onUpdateHandler={(objective) => {
                            setLoginData({...loginData, objective})
                        }} type={Type.Input} placeholder={""}/>
                    </div>


                </div>

                <div className={`${styles.row} ${styles.width_100}`} style={{flexWrap: "nowrap"}}>

                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Learning Goals&nbsp;&#x2022;&nbsp;"write better pandas
                            code"</i></p>
                        <Field value={loginData.learningGoals} onUpdateHandler={(learningGoals) => {
                            setLoginData({...loginData, learningGoals})
                        }} type={Type.Text} placeholder={""}/>
                    </div>

                </div>
                <div className={`${styles.row} ${styles.width_100} ${styles.wrap_row_at_800_px}`} style={{flexWrap: "nowrap"}}>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Preferred Difficulty&nbsp;&#x2022;&nbsp;"comfort",
                            "stretch"</i></p>
                        <Field value={loginData.preferredDifficulty} onUpdateHandler={(preferredDifficulty) => {
                            setLoginData({...loginData, preferredDifficulty})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap", marginLeft: window.innerWidth < 800 ? "0" : "8px"}}>
                        <p className={styles.small_text}><i>Preferred Topics&nbsp;&#x2022;&nbsp;"algorithms", "web
                            development"</i></p>
                        <Field value={loginData.preferredTopics} onUpdateHandler={(preferredTopics) => {
                            setLoginData({...loginData, preferredTopics})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                </div>
                <div className={`${styles.row} ${styles.width_100} ${styles.wrap_row_at_800_px}`} style={{flexWrap: "nowrap"}}>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Risk Tolerance&nbsp;&#x2022;&nbsp;"low", "medium",
                            "high"</i></p>
                        <Field value={loginData.riskTolerance ?? undefined} onUpdateHandler={(riskTolerance) => {
                            setLoginData({...loginData, riskTolerance})
                        }} type={Type.Input} placeholder={""}/>
                    </div>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap", marginLeft: window.innerWidth < 800 ? "0" : "8px"}}>
                        <p className={styles.small_text}><i>Personality Type&nbsp;&#x2022;&nbsp;"creative",
                            "structured"</i></p>
                        <Field value={loginData.personalityType ?? undefined} onUpdateHandler={(personalityType) => {
                            setLoginData({...loginData, personalityType})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                </div>
                <div className={`${styles.row} ${styles.width_100} ${styles.wrap_row_at_800_px}`} style={{flexWrap: "nowrap"}}>
                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Strengths&nbsp;&#x2022;&nbsp;"basic Python", "problem
                            solving"</i></p>
                        <Field value={loginData.strengths} onUpdateHandler={(strengths) => {
                            setLoginData({...loginData, strengths})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap", marginLeft: window.innerWidth < 800 ? "0" : "8px"}}>
                        <p className={styles.small_text}><i>Weaknesses&nbsp;&#x2022;&nbsp;"error handling", "pandas"</i>
                        </p>
                        <Field value={loginData.weaknesses} onUpdateHandler={(weaknesses) => {
                            setLoginData({...loginData, weaknesses})
                        }} type={Type.Input} placeholder={""}/>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.width_100} ${styles.wrap_row_at_800_px}`} style={{flexWrap: "nowrap"}}>

                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap"}}>
                        <p className={styles.small_text}><i>Task Type Preference&nbsp;&#x2022;&nbsp;"puzzle",
                            "real-world"</i></p>
                        <Field value={loginData.taskTypePreference} onUpdateHandler={(taskTypePreference) => {
                            setLoginData({...loginData, taskTypePreference})
                        }} type={Type.Input} placeholder={""}/>
                    </div>

                    <div className={`${styles.col} ${styles.width_100}`}
                         style={{flexWrap: "nowrap", marginLeft: window.innerWidth < 800 ? "0" : "8px"}}>
                        <p className={styles.small_text}><i>Time Per Task Minutes&nbsp;&#x2022;&nbsp;30, 15</i></p>
                        <Field value={loginData.timePerTaskMinutes?.toString()} inputType={"number"}
                               onUpdateHandler={(timePerTaskMinutes) => {
                                   setLoginData({...loginData, timePerTaskMinutes: parseInt(timePerTaskMinutes)})
                               }} type={Type.Input} placeholder={""}/>
                    </div>

                </div>

                <div className={`${styles.row}`} style={{flexWrap: "nowrap"}}>
                    
                    <p className={styles.small_text}><i>Prefers Code Quality&nbsp;&#x2022;&nbsp;Do you want tasks
                        focused on readability/testing?</i></p>
                    <Field value={loginData.prefersCodeQuality?.toString()} inputType={"checkbox"}
                           checked={loginData.prefersCodeQuality?.toString() === "true"}
                           onChangeHandler={(_) => {
                               setLoginData({...loginData, prefersCodeQuality: !loginData.prefersCodeQuality})
                           }} onUpdateHandler={(_) => {}} type={Type.Input} placeholder={""} style={{width: "auto", marginLeft: "8px"}} />

                </div>


                <div className={`${styles.row} ${styles.width_100} ${styles.margin_10px}`}
                     style={{justifyContent: "center"}}>
                    <button onClick={() => {
                        if (user === null && !userToEdit) {
                            addUserMutation.mutate({
                                name: loginData.name,
                                pin: loginData.pin,
                                role: loginData.role,
                                avatar: loginData.avatar,
                                level: loginData.level,
                                email: loginData.email,

                                codingStyle: loginData.codingStyle,
                                learningGoals: loginData.learningGoals,
                                objective: loginData.objective,
                                personalityType: loginData.personalityType,
                                preferredDifficulty: loginData.preferredDifficulty,
                                preferredTopics: loginData.preferredTopics,
                                pythonVersion: loginData.pythonVersion,
                                riskTolerance: loginData.riskTolerance,
                                strengths: loginData.strengths,
                                taskTypePreference: loginData.taskTypePreference,
                                timePerTaskMinutes: loginData.timePerTaskMinutes,
                                weaknesses: loginData.weaknesses,
                                prefersCodeQuality: loginData.prefersCodeQuality,
                            }, {
                                onSuccess: (data) => {
                                    localStorage.setItem("user", JSON.stringify(data))
                                    window.dispatchEvent(new Event("storage"))
                                    // dispatch(action({user}))
                                    const device = getDeviceInfo();
                                    getUserLocation().then(location => {
                                        logDeviceMutation.mutate({
                                            userId: data.id,
                                            device,
                                            location,
                                        })
                                    });

                                },
                                onError: (err) => {
                                    alert(err)
                                }
                            })
                        } else {
                            updateUserMutation.mutate({
                                id: loginData.id,
                                name: loginData.name,
                                pin: loginData.pin,
                                role: loginData.role,
                                avatar: loginData.avatar,
                                level: loginData.level,
                                email: loginData.email,

                                codingStyle: loginData.codingStyle,
                                learningGoals: loginData.learningGoals,
                                objective: loginData.objective,
                                personalityType: loginData.personalityType,
                                preferredDifficulty: loginData.preferredDifficulty,
                                preferredTopics: loginData.preferredTopics,
                                pythonVersion: loginData.pythonVersion,
                                riskTolerance: loginData.riskTolerance,
                                strengths: loginData.strengths,
                                taskTypePreference: loginData.taskTypePreference,
                                timePerTaskMinutes: loginData.timePerTaskMinutes,
                                weaknesses: loginData.weaknesses,
                                prefersCodeQuality: loginData.prefersCodeQuality,
                            }, {
                                onSuccess: (data) => {
                                    if (!userToEdit) {
                                        localStorage.setItem("user", JSON.stringify(data))
                                        dispatch(action({
                                            user: data,
                                            users: users.map(u => u.id === data.id ? data : u)
                                        }))

                                        // window.dispatchEvent(new Event("storage"))
                                    } else {
                                        if (user?.id === data.id) {
                                            localStorage.setItem("user", JSON.stringify(data))
                                        }
                                        dispatch(action({
                                            user: user?.id === data.id ? data : user,
                                            users: users.map(u => u.id === data.id ? data : u)
                                        }))
                                        updateLoginData(data)
                                    }
                                },
                                onError: (err) => {
                                    alert(err)
                                }
                            })
                        }

                    }}>{user ? "Update" : "Submit"} <Send size={14}/></button>

                    {!user && !userToEdit &&
                        <button onClick={() => {
                            setView(UserLoginSignupView.LOGIN)
                        }}>Sign In <User size={14}/></button>
                    }

                    {user?.role === "MASTER" && userToEdit &&
                        <button onClick={() => {
                            deleteUserMutation.mutate(userToEdit.id, {
                                onSuccess: (data) => {
                                    if (user.id === data.id) {
                                        dispatch(action({
                                            user: null,
                                            users: users.filter(x => x.id !== data.id)
                                        }))
                                        setView(UserLoginSignupView.LOGIN)
                                    } else {
                                        dispatch(action({
                                            users: users.filter(x => x.id !== data.id)
                                        }))
                                    }
                                }
                            })
                        }}>Delete <UserMinus size={14}/></button>
                    }
                </div>

            </div>
        )
    }

    const {data, refetch} = api.user.get.useQuery(
        {
            name: loginData.name,
            pin: loginData.pin
        },
        {enabled: (!userToEdit || view === UserLoginSignupView.SIGNUP)} // Disable auto-fetching
    );


    // TODO - send logged in user to tasks
    useEffect(() => {
        if (data !== null && data !== undefined && !userToEdit && view === UserLoginSignupView.LOGIN) {
            const device = getDeviceInfo();
            getUserLocation().then(location => {
                logDeviceMutation.mutate({
                    userId: data.id,
                    device,
                    location,
                })
            });
            dispatch(action({user: data}));
        } else {
            dispatch(action({
                users: users.map(x => (x.id === data?.id ? data : x))
            }))
        }
    }, [data]);


    const renderLogin = () => {
        return (
            <div className={`${styles.col}`} style={{marginTop: !userToEdit ? "20vh" : "0"}}>
                <div className={`${styles.row} ${styles.row_center}`} style={{flexWrap: "nowrap"}}>
                    <Field onUpdateHandler={(name) => {
                        setLoginData({...loginData, name: name})
                    }} type={Type.Input} placeholder={"Username"}/>

                    <Field onUpdateHandler={(pin) => {
                        setLoginData({...loginData, pin: pin})
                    }}
                           inputType="password"
                           maxLength={4}
                           style={{width: "80px", marginLeft: "8px"}}
                           type={Type.Input} placeholder={"Pin"}/>
                </div>

                <div className={`${styles.row} ${styles.width_100} ${styles.margin_10px}`} style={{justifyContent: "center", alignItems: "center"}}>
                    <button onClick={() => {
                        setView(UserLoginSignupView.SIGNUP)
                    }}>Don't have an account | Sign Up <User size={14}/></button>
                </div>


            </div>
        )
    }

    const renderLoginSignup = () => {

        return (
            <div className={`${styles.home_container}`}>
                <div className={styles.home_container_content}>
                    {view === UserLoginSignupView.LOGIN && renderLogin()}
                    {view === UserLoginSignupView.SIGNUP && renderSignup()}
                </div>
            </div>
        )
    }

    return (
        !userToEdit ?
            <div className={styles.main}>
                {renderLoginSignup()}
            </div> : renderLoginSignup()
    )
}