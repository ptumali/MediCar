// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './home.module.css';

// export default function Home() {
//   return (
//     <main className={styles.container}>
//       <div className={styles.logoWrapper}>
//         <Image
//           src="/medicar.png"
//           alt="Medi-Car logo"
//           width={300}
//           height={330}
//           className={styles.logo}
//         />
//       </div>
//       <div className={styles.textWrapper}>
//         <h1 className={styles.title}>Hello, Medi-Car at your service!</h1>
//         <Link href="/vehicle">
//           <button className={styles.button}>Continue</button>
//         </Link>
//       </div>
//     </main>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.centeredContent}>
        <Image
          src="/medicar.png"
          alt="MediCar logo"
          width={160}
          height={160}
          className={styles.logo}
        />
        <h1 className={styles.brand}>Medi<span className={styles.car}>Car</span></h1>
        <p className={styles.tagline}>
          <strong>Welcome,</strong><br />
          How can I assist you today?
        </p>
        <Link href="/vehicle">
          <button className={styles.button}>Continue</button>
        </Link>
      </div>
    </main>
  );
}
