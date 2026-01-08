import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {View} from "~/components/tasks";
import Head from "next/head";
import Navbar from "~/shared/navbar/navbar";
import React, {useEffect} from "react";
import {entireStateImages, entireStateUser, entireStateView, useAppDispatch, useAppSelector} from "~/redux/store";
import {action} from "~/redux/state";
import {UserAuthWrapper} from "~/components/userAuthWrapper";
import {Home} from "~/components/home";
import {UserLoginSignup} from "~/components/userLoginSignup";
import {api} from "~/utils/api";
import {AnimatedContent, AnimatedContentType} from "~/components/animatedContent";

TimeAgo.addLocale(en)

export default function Index() {

    const dispatch = useAppDispatch()
    const view = useAppSelector(entireStateView)
    const user = useAppSelector(entireStateUser)
    const images = useAppSelector(entireStateImages)

    const imageQuery = api.image.getAll.useQuery()

    useEffect(() => {
        (imageQuery.data && images.length === 0) && dispatch(action({images: imageQuery.data}))
    }, [imageQuery.data, user]);

    useEffect(() => {
        const u = localStorage.getItem("user")
        if (u !== null && u !== "null") {
            dispatch(action({view: View.TASKS}))
            window.dispatchEvent(new Event("storage"))
        }
    }, []);


    return (
        <>
            <Head>
                <title>{View[view].toString().toLowerCase()}</title>
                <meta name="description" content="Snek"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                <style>
                    @import
                    url(&#39;https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap&#39;);
                </style>
                <style>
                    @import
                    url(&#39;https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap&#39;);
                </style>
                <style>
                    @import url(&#39;https://fonts.cdnfonts.com/css/sf-pro-display&#39;);
                </style>

                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
                </style>
            </Head>
            <AnimatedContent key={"main"} type={AnimatedContentType.UP}>
                {!user &&
                        <>
                            <Navbar/>
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
                        </>
                }
                {user && <UserAuthWrapper user={user}/>}
            </AnimatedContent>
        </>
    );
}
