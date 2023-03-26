import React, { useState } from 'react';
import './styles.css';

function OrganSelect({ organs, onSelect }) {
  return (
    <div>
      <label>
        Organ:
        <select onChange={(e) => onSelect(e.target.value)}>
          {organs.map((organ) => (
            <option key={organ.id} value={organ.name}>
              {organ.name}
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
  const [organs, setOrgans] = useState([
    { id: 1, name: 'Lungs' },
    { id: 2, name: 'Heart' },
  ]);
  const [organ, setOrgan] = useState(organs[0].name);
  const [symptom, setSymptom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedOrgan = organs.find((o) => o.name === organ);
    const data = { organ: selectedOrgan, symptom };
    console.log(JSON.stringify(data));
  };

  const handlePost = (event) => {
    event.preventDefault();
    const selectedOrgan = organs.find((o) => o.name === organ);
    const data = {
      name: symptom,
      organ: selectedOrgan,
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
          <OrganSelect organs={organs} onSelect={(selectedOrgan) => setOrgan(selectedOrgan)} />
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
