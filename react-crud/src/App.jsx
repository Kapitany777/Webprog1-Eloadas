import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Most már be tudja importálni!

function App() {
  const [adatok, setAdatok] = useState([]);
  const [ujElem, setUjElem] = useState({ moziazon: '', mozinev: '' });
  const [szerkesztesAlatt, setSzerkesztesAlatt] = useState(null);

  // ADATOK LEKÉRÉSE (Read)
  useEffect(() => {
    // A './mozi_api.php' a szerveren ugyanabban a mappában legyen, mint az index.html
    axios.get('mozi_api.php')
      .then(res => {
        setAdatok(res.data);
      })
      .catch(err => console.error("Hiba az adatok lekérésekor:", err));
  }, []);

  // TÖRLÉS (Delete)
  const torles = (id) => {
    if (window.confirm("Biztosan törlöd?")) {
      setAdatok(adatok.filter(item => item.id !== id));
      // Ide jöhet majd az axios.delete('mozi_api.php?id=' + id)...
    }
  };

  // HOZZÁADÁS / MÓDOSÍTÁS (Create/Update)
  const hozzaadas = (e) => {
    e.preventDefault();
    if (szerkesztesAlatt !== null) {
      const frissitett = adatok.map(item => 
        item.id === szerkesztesAlatt ? { ...item, ...ujElem } : item
      );
      setAdatok(frissitett);
      setSzerkesztesAlatt(null);
    } else {
      setAdatok([{ id: Date.now(), ...ujElem }, ...adatok]);
    }
    setUjElem({ moziazon: '', mozinev: '' });
  };

  const szerkesztesInditasa = (item) => {
    setSzerkesztesAlatt(item.id);
    setUjElem({ moziazon: item.moziazon, mozinev: item.mozinev });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{color: '#2196F3'}}>Axios CRUD – Budapesti Mozik</h2>
      
      <form onSubmit={hozzaadas} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Mozi AZ" 
          value={ujElem.moziazon} 
          onChange={e => setUjElem({...ujElem, moziazon: e.target.value})} 
        />
        <input 
          placeholder="Mozi neve" 
          value={ujElem.mozinev} 
          onChange={e => setUjElem({...ujElem, mozinev: e.target.value})} 
        />
        <button type="submit" style={{ marginLeft: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 15px' }}>
          {szerkesztesAlatt !== null ? 'Mentés' : 'Hozzáadás'}
        </button>
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2196F3', color: 'white' }}>
            <th>Azonosító</th><th>Mozi neve</th><th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {adatok.map(item => (
            <tr key={item.id}>
              <td>{item.moziazon}</td>
              <td>{item.mozinev}</td>
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