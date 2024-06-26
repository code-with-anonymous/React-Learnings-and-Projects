import { useState } from 'react';
import './App.css';

function App() {
  // Special line
  const [parentColor, setParentColor] = useState("white");

  const changeParentColor = (newColor) => {
    setParentColor(newColor);
  };

  return (
    <div className="parent d-flex align-items-center" style={{ backgroundColor: parentColor }}>
      <button type="button" className="btn btn-primary m-2" onClick={() => changeParentColor("blue")}>Primary</button>
      <button type="button" className="btn btn-secondary m-2" onClick={()=>setParentColor("pink")}>pink</button>
      <button type="button" className="btn btn-success m-2"onClick={() => changeParentColor("green")}>Success</button>
      <button type="button" className="btn btn-danger m-2" onClick={() => changeParentColor("red")}>  Red</button>
      <button type="button" className="btn btn-warning m-2" onClick={() => changeParentColor("yellow")}>  Yellow</button>
      <button type="button" className="btn btn-info m-2" onClick={() => changeParentColor("lightblue")}>  Light Blue</button>
      <button type="button" className="btn btn-light m-2" onClick={() => changeParentColor("lightgray")}>  Light Gray</button>
      <button type="button" className="btn btn-dark m-2" onClick={() => changeParentColor("black")}>  Dark </button>
    </div>
  );
}

export default App;


