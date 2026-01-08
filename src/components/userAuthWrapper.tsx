import React, {useEffect} from "react";
import {User} from "@prisma/client";
import Tasks, {Hint, Task, View} from "~/components/tasks";
import {action, getWeatherData, initialState} from "~/redux/state";
import {api} from "~/utils/api";
import {entireState, useAppDispatch, useAppSelector} from "~/redux/store";
import Navbar from "~/shared/navbar/navbar";
import {Home} from "~/components/home";
import {UserLoginSignup} from "~/components/userLoginSignup";
import {AnimatedContent, AnimatedContentType} from "~/components/animatedContent";

interface UserAuthWrapperProps {
    user: User
}

export const UserAuthWrapper = ({user}: UserAuthWrapperProps) => {
    const dispatch = useAppDispatch()

    const state = useAppSelector(entireState)
    const {view} = state

    const tasksQuery = api.task.getLatest.useQuery({
        userId: user.id
    })
    const hintsQuery = api.hint.getLatest.useQuery({
        userId: user.id
    })
    const userQuery = api.user.getAll.useQuery({
        userId: user.id
    })

    const notesQuery = api.note.getLatest.useQuery(user.id)

    useEffect(() => {
        tasksQuery.data && dispatch(action({taskData: tasksQuery.data?.map(x => x as Task) ?? []}))
    }, [tasksQuery.data])

    useEffect(() => {
        hintsQuery.data && dispatch(action({hintData: hintsQuery.data?.map(x => x as Hint) ?? []}))
    }, [hintsQuery.data])

    useEffect(() => {
        userQuery.data && dispatch(action({users: userQuery.data}))
    }, [userQuery.data]);

    useEffect(() => {
        notesQuery.data && dispatch(action({notes: notesQuery.data}))
    }, [notesQuery.data]);

    // admin refresh all
    const refresh_tasks_and_hints = () => {
        tasksQuery.refetch().then(d => {
            if (d.status === "success") {
                dispatch(action({
                    taskData: tasksQuery.data?.map(x => x as Task) ?? [],
                    filters: initialState.filters,
                }))
            }
        });
        hintsQuery.refetch().then(d => {
            if (d.status === "success") {
                dispatch(action({hintData: hintsQuery.data?.map(x => x as Hint) ?? []}))
            }
        });
    }

    useEffect(() => {
        dispatch(getWeatherData())
    }, []);

    return (
        <>
            <Navbar forceRefresh={refresh_tasks_and_hints}/>
            {(view === View.LOGIN_SIGNUP || view === View.USER_EDIT) &&
                <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                    <UserLoginSignup/>
                </AnimatedContent>
            }
            {view === View.HOME &&
                <AnimatedContent key={view.toString()} type={AnimatedContentType.LEFT}>
                    <Home/>
                </AnimatedContent>
            }
            {<Tasks/>}
        </>
    )

}