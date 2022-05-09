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
