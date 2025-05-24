import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image
          src="/medicar.png"
          alt="Medi-Car logo"
          width={300}
          height={330}
          className={styles.logo}
        />
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.title}>Hello, Medi-Car at your service!</h1>
        <Link href="/vehicle">
          <button className={styles.button}>Continue</button>
        </Link>
      </div>
    </main>
  );
}
