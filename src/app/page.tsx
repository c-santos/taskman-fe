"use client";

import styles from "./page.module.css";
import { Heading } from "@radix-ui/themes";
import { TaskList } from "@/ui/components/TaskList";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Heading size={"9"}>:taskman</Heading>
        <TaskList />
      </main>
    </div>
  );
}
