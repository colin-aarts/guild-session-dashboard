"use client";

import styles from "./page.module.css";

// Components
import GroupRandomiser from "@/app/components/GroupRandomiser/GroupRandomiser.jsx";
import Countdown from "@/app/components/Countdown/Countdown.jsx";

export default function Home() {
    return (
        <main className={styles.main}>
            <GroupRandomiser teamNames={["Pokémon 🦕", "Lego 🧱", "Pride 🌈", "Space 🚀"]}></GroupRandomiser>
            <Countdown></Countdown>
        </main>
    );
}
