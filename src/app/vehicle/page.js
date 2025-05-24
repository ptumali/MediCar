'use client';
import { useState } from 'react';
import SearchSelect from './SearchSelect';
import styles from './vehicle.module.css';

const MAKES = ['Acura', 'Audi', 'BMW', 'Mazda', 'Mercedes-Benz', 'Mini'];
const MODELS_BY_MAKE = {
  Mazda: ['Mazda 2', 'Mazda 3', 'Mazda 5', 'CX-5', 'CX-9', 'MX-5 Miata'],
  Audi: ['A3', 'A4', 'Q5'],
  BMW: ['3 Series', '5 Series'],
  '': [], // fallback empty list
};
const YEARS = ['2025', '2024', '2023', '2022', '2021'];

export default function VehiclePage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = () => {
    console.log({ make, model, year });
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Help us specify your vehicle:</h1>

      <div className={styles.searchColumn}>
        <SearchSelect label="Make" options={MAKES} onSelect={(val) => {
          setMake(val);
          setModel('');
        }} />

        <SearchSelect
          label="Model"
          options={MODELS_BY_MAKE[make] || []}
          onSelect={setModel}
        />

        <SearchSelect
          label="Year"
          options={YEARS}
          onSelect={setYear}
        />
      </div>

      <button onClick={handleSubmit} className={styles.button}>
        Continue
      </button>
    </main>
  );
}
