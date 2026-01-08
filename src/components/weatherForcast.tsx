import React, {useEffect, useState} from "react";
import styles from "~/pages/index.module.css";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppDispatch, useAppSelector} from "~/redux/store";
import {action, entireState, getGeolocationData, getWeatherData} from "~/redux/state";
import {Field, Type} from "~/components/field";


export const WeatherForcast = () => {

    const state = useAppSelector(entireState)
    const dispatch = useAppDispatch()
    const {weatherData, geolocationData, selectedGeolocationData} = state

    useEffect(() => {
        if (selectedGeolocationData) {
            dispatch(getWeatherData({longitude: selectedGeolocationData.longitude, latitude: selectedGeolocationData.latitude}))
        }
    }, [selectedGeolocationData]);

    useEffect(() => {
        if (geolocationData && geolocationData.results && geolocationData.results.length > 0) {
            dispatch(action({selectedGeolocationData: geolocationData.results[0]}))

        }
    }, [geolocationData]);

    return (

        <>
            {weatherData &&
                <div className={`${styles.row} ${styles.width_100} ${styles.col_all_center}`}>

                    <div className={`${styles.padding_y_10px} ${styles.col} ${styles.width_100}`}>
                        <Field onUpdateHandler={(query) => dispatch(getGeolocationData(query))} type={Type.Input}
                               placeholder={"Search"}/>
                    </div>

                    {geolocationData && geolocationData.results &&
                        <div className={`${styles.padding_y_10px} ${styles.col} ${styles.width_100}`}>
                            <select onChange={e => {
                                geolocationData && geolocationData.results && dispatch(action({selectedGeolocationData: geolocationData.results.find(x => x.id === parseInt(e.target.value))}))
                            }}>
                                {
                                    geolocationData?.results.map(x => <option id={x.id.toString()}
                                                                              value={x.id.toString()}>
                                        {x.name} | {x.latitude} {x.longitude} | {x.country}
                                    </option>)
                                }
                            </select>
                        </div>

                    }

                    <h1>{!selectedGeolocationData ? "St Cezaire sur Siagne" : selectedGeolocationData.name}</h1>
                    <p>Weekly Temperature</p>
                    <ResponsiveContainer height={500} width={"100%"}>
                        <LineChart data={weatherData.daily.time.map((t, i) => ({
                            time: t.toDateString(),
                            high: weatherData.daily.temperature2mMax[i],
                                    low: weatherData.daily.temperature2mMin[i]
                                }))}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="time"/>
                                    <YAxis type={"number"}/>
                                    <Tooltip contentStyle={{background: "var(--bg-color)"}}/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="high" stroke="var(--text-color)"/>
                                    <Line type="monotone" dataKey="low" stroke="var(--text-color)"/>
                                </LineChart>
                            </ResponsiveContainer>
                            <p>Daily Temperature</p>
                            <ResponsiveContainer height={500} width={"100%"}>
                                <LineChart data={weatherData.hourly.time.map((t, i) => ({
                                    time: t.toDateString(),
                                    temperature: weatherData.hourly.temperature2m[i],
                                }))}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="time"/>
                                    <YAxis type={"number"}/>
                                    <Tooltip contentStyle={{background: "var(--bg-color)"}}/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="temperature" stroke="var(--text-color)"/>
                                </LineChart>
                            </ResponsiveContainer>
                            <p>Wind speed and gusts</p>
                            <ResponsiveContainer height={500} width={"100%"}>
                                <LineChart data={weatherData.daily.time.map((t, i) => ({
                                    time: t.toDateString(),
                                    speed: weatherData.daily.windSpeed10mMax[i],
                                    gusts: weatherData.daily.windGusts10mMax[i],
                                }))}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="time"/>
                                    <YAxis type={"number"}/>
                                    <Tooltip contentStyle={{background: "var(--bg-color)"}}/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="speed" stroke="var(--text-color)"/>
                                    <Line type="monotone" dataKey="gusts" stroke="var(--text-color)"/>
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    }
                    {!weatherData && <div className={`${styles.row} ${styles.row_wrap}`}
                                                style={{justifyContent: "center"}}>
                        <p>No weather data found.</p>
                    </div>}
        </>
    )
}