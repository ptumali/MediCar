'use client';
import { useState, useEffect } from 'react';
import styles from './vehicle.module.css';
import { useRouter } from 'next/navigation';

const MAKES = [
  'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Chevrolet', 'Chrysler', 'Dodge',
  'Ford', 'Genesis', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia', 'Lexus',
  'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Subaru', 'Tesla',
  'Toyota', 'Volkswagen', 'Volvo'
];

const MODELS_BY_MAKE = {
  Acura: ['ILX', 'MDX', 'RDX', 'TLX'],
  'Alfa Romeo': ['Giulia', 'Stelvio'],
  Audi: ['A3', 'A4', 'Q5', 'Q7', 'A6', 'e-tron'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5'],
  Chevrolet: ['Cruze', 'Malibu', 'Tahoe', 'Equinox'],
  Chrysler: ['300', 'Pacifica'],
  Dodge: ['Charger', 'Challenger', 'Durango'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Mustang'],
  Genesis: ['G70', 'G80', 'GV70', 'GV80'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Pilot'],
  Hyundai: ['Elantra', 'Santa Fe', 'Tucson', 'Sonata'],
  Jaguar: ['F-Pace', 'XE', 'XF'],
  Jeep: ['Cherokee', 'Grand Cherokee', 'Wrangler'],
  Kia: ['Forte', 'Sorento', 'Sportage', 'Telluride'],
  Lexus: ['ES', 'IS', 'RX', 'NX'],
  Mazda: ['Mazda 2', 'Mazda 3', 'Mazda 5', 'CX-5', 'CX-9', 'MX-5 Miata'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
  Mini: ['Cooper', 'Clubman', 'Countryman'],
  Mitsubishi: ['Outlander', 'Eclipse Cross'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder'],
  Subaru: ['Impreza', 'Forester', 'Outback', 'Crosstrek'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Atlas'],
  Volvo: ['XC40', 'XC60', 'XC90', 'S60']
};

const YEARS = ['2025', '2024', '2023', '2022', '2021'];

export default function VehiclePage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const router = useRouter();


  const handleSubmit = () => {
    console.log('continue button success!');

    if (isValidVin(vin)) {
      console.log({ vin });
    } else {
      console.log({ make, model, year });
    }
    router.push('/symptoms');
    // NEXT STEPS FOR BACKEND DSNI GUYS 
  };


  const isValidVin = (vin) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
  

  function SearchSelect({ label, options, value, onSelect }) {
    const [input, setInput] = useState(value || '');
    const [filtered, setFiltered] = useState(options);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
      setInput(value || '');
      setFiltered(options);
    }, [value, options]);

    const handleChange = (e) => {
      const val = e.target.value;
      setInput(val);
      setFiltered(options.filter((opt) =>
        opt.toLowerCase().includes(val.toLowerCase())
      ));
      setShowDropdown(true);
    };

    const handleSelect = (val) => {
      onSelect(val);
      setShowDropdown(false);
    };

    return (
      <div className={showDropdown ? styles.selectWrapperFocused : styles.selectWrapper}>
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            placeholder={`Search ${label.toLowerCase()}...`}
          />
          {showDropdown && (
            <ul className={styles.dropdown}>
              {filtered.map((item, idx) => (
                <li key={idx} className={styles.option} onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Help us specify your vehicle:</h1>
      {/* <div className={styles.card}> */}
      <div className={styles.searchColumn}>
        <SearchSelect
          label="Make"
          options={MAKES}
          value={make}
          onSelect={(val) => {
            setMake(val);
            setModel('');
            setYear('');
          }}
        />

        <SearchSelect
          label="Model"
          options={make ? MODELS_BY_MAKE[make] || [] : []}
          value={model}
          onSelect={(val) => {
            setModel(val);
            setYear('');
          }}
        />

        <SearchSelect
          label="Year"
          options={model ? YEARS : []}
          value={year}
          onSelect={setYear}
        />
      </div>

      <div className={styles.orSeparator}>
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div className={styles.vinWrapper}>
        <label className={styles.label}>VIN</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        {vin && !isValidVin(vin) && (
          <p className={styles.vinError}>VIN must be 17 valid characters.</p>
        )}
      </div>


      {(isValidVin(vin) || (make && model && year)) && (
        <button onClick={handleSubmit} className={styles.button}>
          Continue
        </button>
      )}
    {/* </div> */}
    </main>
  );
}
