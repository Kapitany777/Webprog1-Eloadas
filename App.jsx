import { useState } from "react";

function App() {
  const [radios, setRadios] = useState([
    { frekvencia: "89.5", teljesitmeny: "10 kW", csatorna: "Kossuth", adohely: "Szentes", cim: "Adótorony 1." },
    { frekvencia: "101.2", teljesitmeny: "5 kW", csatorna: "Petőfi", adohely: "Pécs", cim: "Hegyoldal 12." },
    { frekvencia: "104.6", teljesitmeny: "2 kW", csatorna: "Bartók", adohely: "Miskolc", cim: "Rádió utca 3." }
  ]);

  const [form, setForm] = useState({
    frekvencia: "",
    teljesitmeny: "",
    csatorna: "",
    adohely: "",
    cim: ""
  });

  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex === -1) {
      setRadios([...radios, form]);
    } else {
      const updated = [...radios];
      updated[editIndex] = form;
      setRadios(updated);
      setEditIndex(-1);
    }

    setForm({ frekvencia: "", teljesitmeny: "", csatorna: "", adohely: "", cim: "" });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(radios[index]);
  };

  const handleDelete = (index) => {
    setRadios(radios.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React CRUD – Rádiókiosztás</h1>

      <h2>Rádióadók listája</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>Frekvencia</th>
            <th>Teljesítmény</th>
            <th>Csatorna</th>
            <th>Adóhely</th>
            <th>Cím</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {radios.map((r, index) => (
            <tr key={index}>
              <td>{r.frekvencia}</td>
              <td>{r.teljesitmeny}</td>
              <td>{r.csatorna}</td>
              <td>{r.adohely}</td>
              <td>{r.cim}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Szerkesztés</button>
                <button onClick={() => handleDelete(index)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>
        {editIndex === -1 ? "Új adó felvétele" : "Adó módosítása"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Frekvencia: </label>
          <input name="frekvencia" value={form.frekvencia} onChange={handleChange} />
        </div>
        <div>
          <label>Teljesítmény: </label>
          <input name="teljesitmeny" value={form.teljesitmeny} onChange={handleChange} />
        </div>
        <div>
          <label>Csatorna: </label>
          <input name="csatorna" value={form.csatorna} onChange={handleChange} />
        </div>
        <div>
          <label>Adóhely: </label>
          <input name="adohely" value={form.adohely} onChange={handleChange} />
        </div>
        <div>
          <label>Cím: </label>
          <input name="cim" value={form.cim} onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Mentés</button>
      </form>
    </div>
  );
}

export default App;
