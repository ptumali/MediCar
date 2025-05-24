'use client';
import { useState } from 'react';
import styles from './SearchSelect.module.css';

export default function SearchSelect({ label, options, onSelect }) {
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setFiltered(options.filter((opt) =>
      opt.toLowerCase().includes(val.toLowerCase())
    ));
    setShowDropdown(true);
  };

  const handleSelect = (value) => {
    setInput(value);
    setShowDropdown(false);
    onSelect(value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        placeholder={`Search ${label.toLowerCase()}...`}
      />
      {showDropdown && (
        <ul className={styles.dropdown}>
          {filtered.map((item, index) => (
            <li key={index} className={styles.option} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
