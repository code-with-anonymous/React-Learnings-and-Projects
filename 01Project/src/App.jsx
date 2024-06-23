import { useState } from 'react'

import './App.css'

 export default function App() {

  const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
    if (counter < 20) {
      setCounter(counter + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };


  return (

<> 

    <header>
    <nav className="navbar navbar-expand-lg  bg-dark">
  <div className="container">
    <a className="navbar-brand text-white" href="#">CounterApp</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success text-white" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</header>

<body>

<main className='d-flex align-items-center'>

<div className="container">
  <div className="row">
    <div className="col">
   <h1 className='text-center'>Counter value : {counter}</h1>

   <div className='d-flex justify-content-center'>
   <button className='btn btn-primary m-2' onClick={incrementCounter}>Increment</button>
   <button className='btn btn-primary m-2' onClick={decrementCounter}>Decrement</button>
    </div>
  </div>
  </div>
  </div>

</main>

</body>

<footer>
<h5 className=" m-0 text-center bg-dark text-white py-3"><b>&copy; 2024 .All Rights are Reserved</b></h5>
    </footer>

</>
  );
}


