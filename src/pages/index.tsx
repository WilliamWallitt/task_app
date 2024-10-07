import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import {api} from "~/utils/api";
import Tasks, {Task, View} from "~/components/tasks";
import Head from "next/head";
import Navbar, {Status, THEME} from "~/shared/navbar/navbar";
import React, {useMemo, useState} from "react";

TimeAgo.addLocale(en)

export default function Home() {
    const data = api.task.getLatest.useQuery().data
    const hints = api.hint.getLatest.useQuery().data

    const [theme, setTheme] = useState<THEME>(THEME.LIGHT)
    const [status, setStatus] = useState<Status | null>(null)
    const [view, setView] = useState<View>(View.TASKS)

    const pdfViewer = useMemo(() => (
        <object data="/file.pdf" type="application/pdf"></object>
    ), []);

    return (
        <>
            <Head>
                <title>04_09_24 app</title>
                <meta name="description" content="I love TRPC"/>
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
            </Head>
            <Navbar setView={setView} setTheme={setTheme} theme={theme} status={status}/>
            {data && hints ? <Tasks view={view} pdfViewer={pdfViewer} taskData={data.map(x => x as Task)} hintData={hints} setStatus={setStatus}/> : <div></div>}
        </>
    );
}
