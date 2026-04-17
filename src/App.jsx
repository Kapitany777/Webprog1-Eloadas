import { useState } from 'react'
import TrigonometryApp from "../trigonometry/src/TrigonometryApp"
// import App from "../trigonometry/src/App";
// import App2 from "./App2";

function App() {
  const [menu, setMenu] = useState("app1");

  return (
    <div>
      <nav id="navApps">
        <button onClick={() => setMenu("app1")}>Trigonometria</button> 
        <button onClick={() => setMenu("app2")}>App2</button>
      </nav>

      <div>
        {menu === "app1" && <TrigonometryApp />}
      </div>
    </div>
  );
}
export default App
