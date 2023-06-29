import { useEffect, useState } from "react";
import s from "./GroupRandomiser.module.css";

// Components
import EditableListbox from "@/app/components/EditableListbox/EditableListbox.jsx";

export default function GroupRandomiser({ teamNames = [] }) {
    const teamCount = teamNames.length;
    const [names, setNames] = useState([]);
    const [teams, setTeams] = useState([]);

    const onNamesChange = (names) => {
        setNames(names);
    };

    const onClickRandomise = () => randomise();

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    const randomise = () => {
        const teamSize = Math.floor(names.length / teamCount);
        const randomisedNames = shuffleArray([...names]);
        const randomisedTeams = [...Array(teamCount)].map((_, index) => {
            const sliceStart = index * teamSize;
            const sliceEnd = index + 1 === teamCount ? undefined : (index + 1) * teamSize;
            return randomisedNames.slice(sliceStart, sliceEnd);
        });

        setTeams(randomisedTeams.reverse());
    };

    useEffect(() => {
        const handler = (event) => {
            if (
                event.key === "Enter" &&
                !(document.activeElement instanceof HTMLButtonElement) &&
                !(document.activeElement instanceof HTMLInputElement)
            )
                randomise();
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [randomise]);

    return (
        <div className={s.root}>
            <div className={s.top}>
                {!!teams.length && (
                    <div className={s.teams}>
                        {teams.map((team, index) => {
                            return (
                                <div key={`team-${index + 1}`}>
                                    <h3>Team {teamNames[index]}</h3>
                                    <ul className={s.teamList}>
                                        {team.map((name) => (
                                            <li key={`team-${index + 1}-${name}`}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                )}
                <EditableListbox id="names" onChange={onNamesChange}></EditableListbox>
            </div>
            <button className={s.button} onClick={onClickRandomise}>
                Randomise teams!
            </button>
        </div>
    );
}
