import React, { useState, useEffect } from 'react';

function App() {
  const [adatok, setAdatok] = useState([]);
  const [ujElem, setUjElem] = useState({ fkod: '', moziazon: '' });
  const [szerkesztesAlatt, setSzerkesztesAlatt] = useState(null);

  useEffect(() => {
    fetch('./eloadas/hely.txt')
      .then(res => res.text())
      .then(text => {
        const sorok = text.trim().split('\n').slice(1);
        const feldolgozott = sorok.map((sor, index) => {
          const [fkod, moziazon] = sor.split('\t');
          return { id: index, fkod: fkod?.trim(), moziazon: moziazon?.trim() };
        });
        setAdatok(feldolgozott);
      });
  }, []);

  const torles = (id) => setAdatok(adatok.filter(item => item.id !== id));

  const hozzaadas = (e) => {
    e.preventDefault();
    if (szerkesztesAlatt !== null) {
      // MÓDOSÍTÁS mentése
      const frissitett = adatok.map(item => 
        item.id === szerkesztesAlatt ? { ...item, ...ujElem } : item
      );
      setAdatok(frissitett);
      setSzerkesztesAlatt(null);
    } else {
      // ÚJ ELEM felvétele
      setAdatok([{ id: Date.now(), ...ujElem }, ...adatok]);
    }
    setUjElem({ fkod: '', moziazon: '' });
  };

  const szerkesztesInditasa = (item) => {
    setSzerkesztesAlatt(item.id);
    setUjElem({ fkod: item.fkod, moziazon: item.moziazon });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>React Helyszínkezelő (Full CRUD)</h2>
      
      <form onSubmit={hozzaadas} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Film kód" 
          value={ujElem.fkod} 
          onChange={e => setUjElem({...ujElem, fkod: e.target.value})} 
        />
        <input 
          placeholder="Mozi AZ" 
          value={ujElem.moziazon} 
          onChange={e => setUjElem({...ujElem, moziazon: e.target.value})} 
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          {szerkesztesAlatt !== null ? 'Mentés' : 'Hozzáadás'}
        </button>
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Film kód</th><th>Mozi AZ</th><th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {adatok.map(item => (
            <tr key={item.id}>
              <td>{item.fkod}</td>
              <td>{item.moziazon}</td>
              <td>
                <button onClick={() => szerkesztesInditasa(item)}>Szerkeszt</button>
                <button onClick={() => torles(item.id)} style={{ color: 'red', marginLeft: '5px' }}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;