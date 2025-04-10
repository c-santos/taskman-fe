"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.replace("/tasks");

  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
    </div>
  );
}
