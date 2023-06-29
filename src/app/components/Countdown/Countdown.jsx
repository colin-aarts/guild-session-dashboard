import { useEffect, useState } from "react";
import s from "./Countdown.module.css";

export default function Countdown() {
    const [date, setDate] = useState();
    const [timeLeft, setTimeLeft] = useState();

    const id = `timer-${Date.now()}`;
    const audio = new Audio("/Air Horn.m4a");

    const onSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const time = fd.get(id);
        if (!time) return;
        const date = new Date();
        const [hours, minutes] = time.split(":");

        date.setHours(+hours);
        date.setMinutes(+minutes);
        date.setSeconds(0);
        setDate(date);
    };

    useEffect(() => {
        let timer;
        const setTimer = () => {
            if (!date) return;
            clearTimeout(timer);
            timer = setTimeout(() => {
                const timeLeft = (date.getTime() - Date.now()) / 1000;
                setTimeLeft(timeLeft);
                if (timeLeft <= 0) return audio.play();
                setTimer();
            }, 1000);
        };

        clearTimeout(timer);
        setTimer();
    }, [date]);

    const zeroPad = (value) => `${value.length < 2 ? "0" : ""}${value}`;

    const getTimeLeftDisplay = () => {
        if (!timeLeft) return;
        if (timeLeft <= 0) return "Break!";
        const timeLeftMinutes = Math.floor(timeLeft / 60);
        const timeLeftSeconds = Math.floor(timeLeft - timeLeftMinutes * 60);

        return `${zeroPad(timeLeftMinutes.toString())}:${zeroPad(timeLeftSeconds.toString())}`;
    };

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={onSubmit}>
                <input type="time" name={id} />
                <button type="submit">Set</button>
            </form>
            <div className={s.timer}>{getTimeLeftDisplay()}</div>
        </div>
    );
}
