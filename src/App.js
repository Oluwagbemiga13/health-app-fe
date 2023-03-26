import React, { useState } from 'react';
import './styles.css';

function SystemSelect({ systems, onSelect }) {
  return (
    <div>
      <label>
        System:
        <select onChange={(e) => onSelect(e.target.value)}>
          {systems.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function handleGet() {
  fetch('http://localhost:8080/api/test/1')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

function App() {
  const [system, setSystem] = useState('Respiratory');
  const [symptom, setSymptom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { system, symptom };
    console.log(JSON.stringify(data));
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = {
      name: symptom,
      systems: [{ id: 1, name: system }],
      id: null // Initialize the id attribute to null
    };
    fetch('http://localhost:8080/api/symptom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      //.then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>My health app FE</h1>
      <form onSubmit={handleSubmit}>
        <label>
          System:
          <select value={system} onChange={(event) => setSystem(event.target.value)}>
            <option value="Respiratory">Respiratory</option>
            <option value="Nervous">Nervous</option>
          </select>
        </label>
        <br />
        <label>
          Symptom:
          <input type="text" value={symptom} onChange={(event) => setSymptom(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleGet}>Test GET Request</button>
        <button type="button" onClick={handlePost}>POST</button>
      </form>
    </div>
  );
}

export default App;
