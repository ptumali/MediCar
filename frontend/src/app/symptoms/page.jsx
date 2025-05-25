'use client';

import { useState, useEffect } from 'react';
import styles from './symptoms.module.css';

export default function SymptomsPage() {
  const [customProblem, setCustomProblem] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [carInfo, setCarInfo] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('carInfo');
    if (stored) {
      setCarInfo(JSON.parse(stored));
    }
  }, []);

  const displayInfo = carInfo?.vin
    ? `VIN: ${carInfo.vin}`
    : `Car Type: ${carInfo?.year} ${carInfo?.make} ${carInfo?.model}`;

  const problems = [
    'Car does not start',
    'Engine has ticking sounds',
    'AC smells funky',
    'Signal does not turn on',
    'There’s a leak'
  ];

  const handleSelect = (problem) => {
    setSelectedProblem(problem);
    setCustomProblem('');
  };

  const handleCustomSubmit = () => {
    if (customProblem) {
      localStorage.setItem('selectedProblem', JSON.stringify(customProblem));
      console.log('Custom problem submitted:', customProblem);
    } else if (selectedProblem) {
      localStorage.setItem('selectedProblem', JSON.stringify(selectedProblem));
      console.log('Predefined problem submitted:', selectedProblem);
    }
    window.location.href = '/result';
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>{displayInfo || 'Loading car info...'}</h1>
      <p>
        Incorrect?{' '}
        <a className={styles.editLink} href="/vehicle">
          Edit here
        </a>
      </p>

      <h2 className={styles.question}>Which best describes your problem?</h2>

      <div className={styles.buttonGroup}>
        {problems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSelect(item)}
            className={`${styles.problemButton} ${selectedProblem === item ? styles.selected : ''}`}
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
          onChange={(e) => {
            setCustomProblem(e.target.value);
            setSelectedProblem(null);
          }}
        />
        <button className={styles.submitButton} onClick={handleCustomSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
}
