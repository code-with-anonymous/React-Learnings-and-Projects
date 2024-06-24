import React from 'react';

function Card({text, title,btnText}) {
  return (
    <>
      <div className="card m-2"  style={{ width: '18rem' }}>
        <img src="src/assets/download.jpeg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title"> {title}</h5>
          <p className="card-text">{text}</p>
          <a href="#" className="btn btn-primary">{btnText}</a>
            
        </div>
      </div>
    </>
  );
}

export default Card;

