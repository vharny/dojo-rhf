import React from "react";

export type FieldsErrors = {
    [fieldId: string]: string[];
};

export type Gender = "M" | "F" | "O";

export type DateInputProps = {
    id: string;
    label: string
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    onBlur: () => void;
    size: number;
    classModifier?: string;
    message: string;
    forceDisplayMessage: boolean;
}
