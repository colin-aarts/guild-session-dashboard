"use client";

import Image from "next/image";
import styles from "./page.module.css";

// Components
import GroupRandomiser from "@/app/components/GroupRandomiser/GroupRandomiser.jsx";

export default function Home() {
    return (
        <main className={styles.main}>
            <GroupRandomiser teamNames={["Pokémon", "Lego", "Rainbow", "Rainbow 2"]}></GroupRandomiser>
        </main>
    );
}
