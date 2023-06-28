import { useEffect, useState } from "react";
import s from "./EditableListbox.module.css";

export default function EditableListbox({ id, onChange = () => {} }) {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const optionsJSON = localStorage.getItem(id);
        if (!optionsJSON) return;
        const options = JSON.parse(optionsJSON);
        setOptions(options);
    }, []);

    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(options));

        onChange(options);
    }, [options]);

    const onInput = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        setOptions([...options, fd.get("editable-listbox-input")]);
        setInputValue("");
    };

    const onSelectKeyDown = (event) => {
        const { target } = event;

        if (target.selectedIndex < 0) return;

        if (event.key === "Delete") {
            event.preventDefault();
            setOptions([...options].filter((option) => option !== target.options[target.selectedIndex].value));
        }
    };

    return (
        <div className={s.root}>
            <form onSubmit={onSubmit}>
                <input
                    className={s.input}
                    name="editable-listbox-input"
                    value={inputValue}
                    placeholder="Enter name…"
                    onInput={onInput}
                />
            </form>
            {!!options.length && (
                <select
                    className={s.select}
                    multiple
                    size={Math.min(Math.max(1, options.length), 6)}
                    onKeyDown={onSelectKeyDown}
                >
                    {options.map((option, index) => (
                        <option key={`${option}-${index}`} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
