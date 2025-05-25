'use client';
import styles from './results.module.css';
import { useSearchParams } from 'next/navigation';

export default function ResultsPage() {
  // In a real app, you'd probably pass this through state or query params
  const car = { year: '2023', make: 'Mazda', model: '5' };
  const symptom = 'Engine has ticking sounds';

  // Dummy results
  const contact = '+1 111 111 1111';
  const urgency = 'Low';
  const problems = ['Loose timing chain', 'Oil pressure issue', 'Valve train wear'];

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Car Type: {car.year} {car.make} {car.model}</h2>

        <div className={styles.symptomSearch}>
          <input
            type="text"
            value={symptom}
            readOnly
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <p className={styles.label}>Roadside Assistance Contact:</p>
        <p className={styles.contact}>{contact}</p>

        <p className={styles.label}>Urgency Level: <span className={styles.urgency}>{urgency}</span></p>

        <p className={styles.label}>Potential Problems:</p>
        <ul className={styles.problemList}>
          {problems.map((prob, idx) => (
            <li key={idx}>• {prob}</li>
          ))}
        </ul>

        <p className={styles.label}>What to do?</p>
        <p className={styles.instructions}>
          Get your vehicle inspected within a week. If noise worsens, stop driving and call assistance.
        </p>
      </div>
    </main>
  );
}
