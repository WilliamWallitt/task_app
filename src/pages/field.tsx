import React, {useEffect, useRef} from "react"
import { useState } from "react";
import Editor from "react-simple-code-editor";

export enum Type {
    Text,
    Code
}

interface FieldProps {
    value?: string,
    onUpdateHandler: (value: string) => void,
    onChangeHandler?: (value: string) => void,
    type: Type,
    placeholder: string,
    rows?: number,
    inputLength?: number,
    clearInputOnUpdate?: boolean,
    disabled?: boolean,
    hide?: boolean,
}

export const Field = ({value, onUpdateHandler, onChangeHandler, type, placeholder, inputLength, rows, clearInputOnUpdate, disabled, hide}: FieldProps) => {
    const [input, setInput] = React.useState<string>(value || "")

    useEffect(() => {
        value !== undefined && setInput(value)
    }, [value]);

    useEffect(() => {
        clearInputOnUpdate && setInput("")
    }, [onUpdateHandler]);

    const renderField = (type: Type): JSX.Element => {
        if (hide) {
            return <></>
        }
        switch (type) {
            case Type.Text:
                return (
                    <textarea rows={rows || 6}
                              disabled={disabled}
                              onBlur={() => input.length >= (inputLength !== undefined ? inputLength : 5) && onUpdateHandler(input)}
                              placeholder={placeholder} value={input}
                              onChange={(e) => {
                                  setInput(e.target.value)
                                  onChangeHandler && onChangeHandler(e.target.value)
                              }}/>
                )
            case Type.Code:
                return (
                    <Editor
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`editor ${disabled && "editor_disabled"}`}
                        value={input}
                        padding={10}
                        style={{
                            fontFamily: 'monospace',
                            fontSize: "inherit",
                            height: "fit-content",
                            minHeight: !disabled ? "120px" : "auto"
                        }}
                        onBlur={() => input.length >= (inputLength !== undefined ? inputLength : 5) && onUpdateHandler(input)}
                        onValueChange={(code) => {
                            setInput(code)
                            onChangeHandler && onChangeHandler(code)
                        }}
                        highlight={code => code}/>
                );

        }
    }

    return (renderField(type))
}