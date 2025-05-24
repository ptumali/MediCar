'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './symptoms.module.css';

export default function SymptomsPage() {
  const [customProblem, setCustomProblem] = useState('');
  const router = useRouter();

  const carInfo = '2023 Mazda 5'; // placeholder, can be dynamic later

  const problems = [
    'Car does not start',
    'Engine has ticking sounds',
    'AC smells funky',
    'Signal does not turn on',
    'There’s a leak'
  ];

  const handleSelect = (problem) => {
    console.log('Selected problem:', problem);
    // Navigate or process
  };

  const handleCustomSubmit = () => {
    console.log('Custom problem:', customProblem);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Car Type: {carInfo}</h1>
      <p>
        Incorrect?{' '}
        <a className={styles.editLink} href="/vehicle">
          Edit here
        </a>
      </p>

      <h2 className={styles.question}>Which best describe your problem?</h2>

      <div className={styles.buttonGroup}>
        {problems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSelect(item)}
            className={styles.problemButton}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.customProblemSection}>
        <p className={styles.customPrompt}>Problem not listed?</p>
        <p className={styles.customSubPrompt}>We’d love to hear more!</p>
        <input
          type="text"
          className={styles.input}
          placeholder="Describe your problem"
          value={customProblem}
          onChange={(e) => setCustomProblem(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleCustomSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
}
