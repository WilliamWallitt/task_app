import React, {useEffect, useState} from "react";
import styles from "../pages/index.module.css";
import {api} from "~/utils/api";
import {Field, Type} from "~/components/field";
import {entireState, useAppDispatch, useAppSelector} from "~/redux/store";
import { action } from "~/redux/state";

interface PinProps {
    children: React.ReactNode;
}

export const Pin = ({children}: PinProps) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(entireState)
    const {pin} = state

    const [message, setMessage] = useState<string>("")

    // endpoint deleted
    // const { data: correct_pin } = api.check.useQuery(pin);

    const correct_pin = false

    const has_admin_pin = (): boolean => {
        return localStorage.getItem("pin") !== null
    }

    const set_admin_pin = (pin: string) => {
        if (correct_pin) {
            setMessage("")
            localStorage.setItem("pin", pin)
            window.dispatchEvent(new Event("storage"))
            setMessage("Correct")
        } else {
            setMessage("Incorrect")
        }
    }

    useEffect(() => {
        if (pin.length === 4) {
            set_admin_pin(pin);
        } else {
            setMessage("");
        }
    }, [pin, correct_pin]); // Runs only when `pin` changes

    // children returned if pin correct...

    return (
        has_admin_pin() ? children : (
            <div style={{height: "60vh"}} className={`${styles.col_all_center} ${styles.padding_10px}`}>
                <p>Enter PIN</p>
                <Field onUpdateHandler={(pin) => dispatch(action({pin}))}
                       type={Type.Input}
                       placeholder={""}
                       inputType="password"
                       maxLength={4}
                       autoFocus={true}
                       style={{width: "80px"}}/>
                <p>{message}</p>
            </div>
        ))
};

