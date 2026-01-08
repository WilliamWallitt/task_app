import React, {SyntheticEvent, useEffect, useRef} from "react"
import Editor from "react-simple-code-editor";
import autosize from 'autosize';
import { v4 as uuidv4 } from 'uuid';

export enum Type {
    Text,
    Code,
    Input
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
    code_editor_height_px?: string,
    maxLength?: number,
    minLength?: number,
    autoFocus?: boolean,
    style?: React.CSSProperties | undefined,
    inputType?: React.HTMLInputTypeAttribute | undefined,
    initialValue?: string,
    paragraphOnDisable?: boolean,
    checked?: boolean
}

export const Field = ({paragraphOnDisable, checked, initialValue, inputType, autoFocus, value, style, onUpdateHandler, onChangeHandler, type, placeholder, inputLength, rows, clearInputOnUpdate, code_editor_height_px, disabled, hide, minLength, maxLength}: FieldProps) => {
    const [input, setInput] = React.useState<string>(initialValue ? initialValue : value ?? "")

    const id = uuidv4()

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const autoResizeHandler = function() {
        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // Reset height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 20}px`; // Set new height
        }
    };

    useEffect(() => {
        !rows && type === Type.Text && autoResizeHandler()
    }, [disabled]);

    useEffect(() => {
         if (value !== undefined) {
             setInput(value)
         } else if (initialValue !== undefined) {
            setInput(initialValue)
        }
    }, [value, initialValue]);

    useEffect(() => {
        if (clearInputOnUpdate) {
            setInput("")
        }
    }, [onUpdateHandler]);

    const renderField = (type: Type): JSX.Element => {
        if (hide) {
            return <></>
        }
        switch (type) {
            case Type.Input:
                if (disabled && paragraphOnDisable) {
                    return <p style={{...style, whiteSpace: "pre-wrap"}}>
                        {value}
                    </p>
                }

                return (
                    <input minLength={minLength} value={input}
                           maxLength={maxLength}
                           style={{...style, background: disabled ? "transparent" : ""}}
                           disabled={disabled}
                           type={inputType}
                           autoFocus={autoFocus}
                           placeholder={placeholder}
                           checked={checked}
                           onBlur={() => {
                               onUpdateHandler(input)
                               if (clearInputOnUpdate) {
                                   setInput("")
                               }
                           }}
                           onChange={(e) => {
                               setInput(e.target.value)
                               if (onChangeHandler) {
                                   onChangeHandler(e.target.value)
                               }
                           }}/>
                );
            case Type.Text:
                if (disabled && paragraphOnDisable) {
                    return <p style={{...style, whiteSpace: "pre-wrap"}}>
                        {value}
                    </p>
                }
                return (
                    <textarea
                        rows={rows ?? 3}
                        ref={textAreaRef}
                              maxLength={maxLength}
                              minLength={minLength}
                              disabled={disabled}
                              autoFocus={autoFocus}
                              style={{...style, background: disabled ? "transparent" : style?.background}}
                              id={id}
                              onBlur={() => {
                                  if (input.length >= (inputLength ?? 5)) {
                                      onUpdateHandler(input)
                                      if (clearInputOnUpdate) {
                                          setInput("")
                                      }
                                  }
                              }}
                              placeholder={placeholder} value={input}
                              onChange={(e) => {
                                  setInput(e.target.value)
                                  if (onChangeHandler) {
                                      onChangeHandler(e.target.value)
                                  }
                                  !rows && autoResizeHandler()
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
                            minHeight: !disabled ? code_editor_height_px ?? "120px" : "auto",
                            ...style
                        }}
                        onBlur={() => {
                            if (input.length >= (inputLength ?? 5)) {
                                onUpdateHandler(input)
                                if (clearInputOnUpdate) {
                                    setInput("")
                                }
                            }
                        }}
                        onValueChange={(code) => {
                            setInput(code)
                            if (onChangeHandler) {
                                onChangeHandler(code)
                            }
                        }}
                        highlight={code => code}/>
                );

        }
    }

    return (renderField(type))
}