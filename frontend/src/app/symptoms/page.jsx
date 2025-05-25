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

  // const handleCustomSubmit = () => {
  //   if (customProblem) {
  //     localStorage.setItem('selectedProblem', JSON.stringify(customProblem));
  //     console.log('Custom problem submitted:', customProblem);
  //   } else if (selectedProblem) {
  //     localStorage.setItem('selectedProblem', JSON.stringify(selectedProblem));
  //     console.log('Predefined problem submitted:', selectedProblem);
  //   }
  //   window.location.href = '/result';
  // };

  const handleCustomSubmit = async () => {
  let problemToSubmit = '';

  if (customProblem) {
    problemToSubmit = customProblem;
    localStorage.setItem('selectedProblem', JSON.stringify(customProblem));
    console.log('Custom problem submitted:', customProblem);
  } else if (selectedProblem) {
    problemToSubmit = selectedProblem;
    localStorage.setItem('selectedProblem', JSON.stringify(selectedProblem));
    console.log('Predefined problem submitted:', selectedProblem);
  }

  if (!problemToSubmit) {
    console.warn('No problem provided');
    return;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/query?problem=${encodeURIComponent(problemToSubmit)}`
    );

    if (!response.ok) {
      throw new Error(`Query failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Diagnostic report:', result);

    // Save the diagnostic result if needed for use in /result page
    localStorage.setItem('diagnosticReport', JSON.stringify(result));

    // Navigate to result page
    window.location.href = '/result';
  } catch (error) {
    console.error('Error fetching diagnostic report:', error);
  }
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

      <h2 className={styles.question}>Does any of the following describe your problem?</h2>

      <div className={styles.mainContent}>
        <img src="/medicar-think.png" alt="Thinking car" className={styles.imageBox} />
        <div>
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
        </div>
      </div>

      <div className={styles.customProblemSection}>
        <p className={styles.customPrompt}>Problem not listed? We can still help!</p>
        <div className={styles.inputWrapper}>
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
          {/* <span className={styles.searchIcon}>🔍</span> */}
        </div>
        <button className={styles.submitButton} onClick={handleCustomSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
}
